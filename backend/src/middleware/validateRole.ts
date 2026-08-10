import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

const validateRole = (req: Request, res: Response, next: NextFunction) => {

    if(req?.user?.role === "recruiter") {
        return next();
    }

    else {
        throw new AppError("You are not allowed to access this endpoint", 401);
    }
};

export default validateRole;