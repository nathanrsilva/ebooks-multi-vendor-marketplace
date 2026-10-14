import type { Request, Response, NextFunction } from "express";
import AppError from "./AppError.js";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error.message);
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
}

export const asyncHandler = <
    P = {},
    ResBody = any,
    ReqBody = any,
    ReqQuery = any,
    Locals extends Record<string, any> = Record<string, any>,
>(
    fn: (
        req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
        res: Response<ResBody, Locals>,
        next: NextFunction) => Promise<any>
) => {
    return (
        req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
        res: Response<ResBody, Locals>,
        next: NextFunction
    ) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}