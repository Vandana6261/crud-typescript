import { Response } from "express";
import { CookieOptions } from "express";


export const getCookieOptions = (maxAge: number): CookieOptions => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
  };
};


export const setSignupSessionCookie = (res: Response, token: string) => {
  res.cookie("signupSession", token, getCookieOptions(10 * 60 * 1000));
};



export const setAccessTokenCookie = (res: Response, token: string) => {
  res.cookie("accessToken", token, getCookieOptions(15 * 60 * 1000));
};



export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie("refreshToken", token, getCookieOptions(30 * 24 * 60 * 60 * 1000));
};