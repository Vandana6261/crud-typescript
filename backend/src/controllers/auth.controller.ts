import { Request, Response } from "express";
import { registerUserSchema, signupInitSchema, verifyOtpSchema , loginSchema} from "../schemas/auth.schema";
import { registerUserService, signupInitService, verifyOtpService, loginService, logoutService, meService } from "../services/auth.services";
import { setAccessTokenCookie, setRefreshTokenCookie, setSignupSessionCookie } from "../utils/cookie";
import { generateAccessToken } from "../utils/token";


export const signupInit = async (req: Request, res: Response) => {
    const { email } = signupInitSchema.parse(req.body);
    const result = await signupInitService(email);

    setSignupSessionCookie(res, result.signupToken);

    return res.status(200).json({success: true, message: "OTP sent successfully",});
};


export const verifyOtp = async (req: Request, res: Response) => {
    const { otp } = verifyOtpSchema.parse({email: req.signup!.email, ...req.body});
    await verifyOtpService(req.signup!.email, otp);

    return res.status(200).json({success: true, message: "OTP verified successfully"});
}


export const registerUser = async (req: Request, res: Response) => {
    const registerData = registerUserSchema.parse({
        ...req.body,
        email: req.signup!.email,
    });

    const result = await registerUserService(registerData);
    setAccessTokenCookie(res, result.accessToken);
    setRefreshTokenCookie(res, result.refreshToken);

    res.clearCookie("signupSession");
    return res.status(201).json({success: true, data: {username: result.user.username, role: result.user.role, userId: result.user._id}});
};


export const login = async (req: Request, res: Response) => {
    const loginData = loginSchema.parse(req.body);

    const result = await loginService(loginData);

    setAccessTokenCookie(res, result.accessToken);
    setRefreshTokenCookie(res, result.refreshToken);

    return res.status(200).json({success: true, data: {username: result.user.username, role: result.user.role, userId: result.user._id}});
};


export const logout = async (req: Request, res: Response) => {
    await logoutService(req.user!.userId);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({success: true, message: "Logged out successfully"});
};

``
export const me = async (req: Request, res: Response) => {
    const user = await meService(req.user!.userId);

    return res.status(200).json({success: true, data: user});
};


export const refresh = async (req: Request, res: Response) => {
    const accessToken = generateAccessToken({
        userId: req.user!.userId,
        role: req.user!.role,
    });

    setAccessTokenCookie(res, accessToken);

    return res.status(200).json({success: true, message: "Access token refreshed"});
};