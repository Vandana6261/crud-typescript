import { Request, Response, NextFunction } from "express"

export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.method);
    // console.log("line 5")
    // return res.status(418).json({ message: "Logger executed" });
    next();
}