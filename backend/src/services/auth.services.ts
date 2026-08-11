import crypto from "crypto";
import User from "../models/user.model";
import SignupOtp from "../models/signupOtp.model";
import AppError from "../utils/AppError";
import { sendOtpEmail } from "../utils/email";
import { generateAccessToken, generateRefreshToken, generateSignupSessionToken, hashToken } from "../utils/token";
import { LoginDTO, RegisterUserDTO } from "../dto/auth.dto";
import { hashPassword, comparePassword } from "../utils/password";


export const signupInitService = async (email: string) => {

    const existingUser = await User.findOne({email,});

    if(existingUser){
        throw new AppError("User already registered", 409);
    }

    // OTP generation will come next
    const otp: string = crypto.randomInt(100000, 999999).toString();
    await SignupOtp.findOneAndDelete({ email });
    await SignupOtp.create({email, otp,});
    
    await sendOtpEmail(email, otp);
    console.log(otp, "otp")
    const signupToken = generateSignupSessionToken({email});

    return {signupToken};
};


export const verifyOtpService = async (email: string, otp: string) => {
    const savedOtp = await SignupOtp.findOne({ email });

    if(!savedOtp){
        throw new AppError("OTP expired or not found", 400);
    }

    if(savedOtp.otp !== otp){
        throw new AppError("Invalid OTP", 400);
    }

    await SignupOtp.deleteOne({ email });

    return true;
};


export const registerUserService = async (registerData: RegisterUserDTO) => {
    try {
        const existingUser = await User.findOne({
            username: registerData.username
        });

        if(existingUser){
            throw new AppError("User already exists with this username", 409);
        }

        const hashedPassword = await hashPassword(registerData.password);
        
        const user = await User.create({
            ...registerData,
            password: hashedPassword,
        });

        

        const accessToken = generateAccessToken({
            userId: user._id.toString(),
            role: user.role,
        });
        
        const refreshToken = generateRefreshToken({
            userId: user._id.toString(),
            role: user.role,
        });
        
        user.hashedRefreshToken = hashToken(refreshToken);
        
        await user.save();
        
        return {
            user,
            accessToken,
            refreshToken,
        };
    } catch (error) {
     console.log(error, "registerUserService error")
     throw new AppError("Internal server error", 500); 
    }
};


export const loginService = async (loginData: LoginDTO) => {
    const user = await User.findOne({
        email: loginData.email,
    });

    if(!user){
        throw new AppError("User is not registered with this mail", 401);
    }

    const isPasswordValid = await comparePassword(
        loginData.password,
        user.password
    );

    if(!isPasswordValid){
        throw new AppError("Invalid password", 401);
    }

    const accessToken = generateAccessToken({
        userId: user._id.toString(),
        role: user.role,
    });

    const refreshToken = generateRefreshToken({
        userId: user._id.toString(),
        role: user.role,
    });

    user.hashedRefreshToken = hashToken(refreshToken);

    await user.save();

    return {
        user,
        accessToken,
        refreshToken,
    };
};


export const logoutService = async (userId: string) => {
    const user = await User.findById(userId);

    if(!user){
        throw new AppError("User not found", 404);
    }

    user.hashedRefreshToken = undefined;

    await user.save();

    return true;
};


export const meService = async (userId: string) => {
    const user = await User.findById(userId).select("username role _id");
    if(!user){
        throw new AppError("User not found", 404);
    }

    return {
        userId: user._id,
        username: user.username,
        role: user.role,
    }
};