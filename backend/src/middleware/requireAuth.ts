import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import { verifyAccessToken } from "../utils/token";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({
            success: false,
            code: "ACCESS_TOKEN_MISSING",
            message: "Access token missing"
        })
    }

    try {
        const payload = verifyAccessToken(token);
        req.user = {userId: payload.userId, role: payload.role,};
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                    success: false,
                    code: "ACCESS_TOKEN_EXPIRED",
                    message: "Access token expired",
                });
            }

        if (error instanceof jwt.JsonWebTokenError) {
            return next(new AppError("Invalid access token", 401));
        }

        next(error);
    }
};

export default requireAuth;