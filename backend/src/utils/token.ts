import jwt from "jsonwebtoken";
import crypto from "crypto";

interface SignupSessionPayload {
  email: string;
}


interface AccessTokenPayload {
  userId: string;
  role: string;
}


interface RefreshTokenPayload {
  userId: string;
  role: string;
}



export const generateAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET!,
    {expiresIn: "15m",}
  );
};


export const generateSignupSessionToken = (payload: SignupSessionPayload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SIGNUP_SECRET!,
    {expiresIn: "10m",}
  );
};


export const generateRefreshToken = (payload: RefreshTokenPayload) => {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET!,
    {expiresIn: "30d",}
  );
};


export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};


export const verifySignupSessionToken = (token: string): SignupSessionPayload => {
  return jwt.verify(token, process.env.JWT_SIGNUP_SECRET!) as SignupSessionPayload;
};


export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as AccessTokenPayload;
};


export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as RefreshTokenPayload;
};