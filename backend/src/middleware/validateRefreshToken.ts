import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import AppError from "../utils/AppError";
import {verifyRefreshToken, hashToken,} from "../utils/token";

const validateRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return next(new AppError("Refresh token missing", 401));
    }

    try {
        const payload = verifyRefreshToken(token);
        const user = await User.findById(payload.userId);
        if (!user) {
            return next(new AppError("User not found", 404));
        }

        const hashedToken = hashToken(token);

        if (user.hashedRefreshToken !== hashedToken) {
            return next(new AppError("Invalid refresh token", 401));
        }

        req.user = {
            userId: payload.userId,
            role: user.role,
        };

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return next(new AppError("Refresh token expired", 401));
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return next(new AppError("Invalid refresh token", 401));
        }

        next(error);
    }
};

export default validateRefreshToken;