import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import { verifySignupSessionToken } from "../utils/token";

const validateSignupToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.signupSession;

    if (!token) {
        return next(new AppError("Signup token missing", 401));
    }

    try {
        const payload = verifySignupSessionToken(token);
        req.signup = {email: payload.email,};
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return next(new AppError("Signup token expired", 401));
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return next(new AppError("Invalid signup token", 401));
        }
        next(error);
    }
};

export default validateSignupToken;