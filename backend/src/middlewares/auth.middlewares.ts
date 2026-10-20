import type { NextFunction, Request, Response } from 'express';
import { MerchantLoginSchema, MerchantRegisterSchema, MerchantTokenPayloadJWT } from '../schemas/merchant.schemas.js';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

export const validateTokenMerchantAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.auth_token;

        if (!token) throw new AppError('Route accessible only to logged-in merchants', 401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        const validatePayload = MerchantTokenPayloadJWT.safeParse(decoded);

        if (!validatePayload.success) throw new AppError('Invalid token payload', 400);

        req.merchant = {
            id: validatePayload.data.id,
            accountId: validatePayload.data.accountId
        };

        return next();

    } catch (err) {
        if (err instanceof AppError) {
            return next(err);
        }
        return next(new AppError('Unauthorized / Invalid Token', 401));
    }
}

export const validateRegisterBody = async (req: Request, res: Response, next: NextFunction) => {

    const result = MerchantRegisterSchema.safeParse(req.body);

    if (!result.success) {
        throw new AppError('Invalid request body data', 400, result.error.issues);
    }

    return next();

}

export const validateLoginBody = async (req: Request, res: Response, next: NextFunction) => {

    const result = MerchantLoginSchema.safeParse(req.body);

    if (!result.success) {
        throw new AppError('Invalid request body data', 400, result.error.issues);
    }

    return next();

}