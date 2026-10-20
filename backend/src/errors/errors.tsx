import type { Request, Response, NextFunction } from "express";
import AppError from "./AppError.js";
import multer from "multer";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);

    if (error instanceof AppError) {

        if (!error.ZodFields || error.ZodFields?.length === 0) {
            return res.status(error.StatusCode).json({ error: error.message });
        }

        return res.status(error.StatusCode).json({
            error: error.message,
            details: error.Formatter
        });
    } else if (error instanceof multer.MulterError && error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ error: `Only one image file is allowed for the ${error.field} field` });
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