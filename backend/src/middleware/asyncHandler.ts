import { Request, Response, NextFunction, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

// const asyncHandler = (fn: RequestHandler): RequestHandler => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         Promise.resolve(fn(req, res, next)).catch(next);
//     }
// }

const asyncHandler = <
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
>(
  fn: RequestHandler<P, ResBody, ReqBody, ReqQuery>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
