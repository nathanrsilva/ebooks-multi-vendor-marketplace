import type { NextFunction, Request, Response } from 'express';
import { MerchantRegisterSchema } from '../schemas/merchant.schema.js';
import AppError from '../errors/AppError.js';

export const validateBodyRegister = async (req: Request, res: Response, next: NextFunction) => {

    const result = MerchantRegisterSchema.safeParse(req.body);

    if (!result.success) {
        throw new AppError('Invalid request body data', 400);
    }

    next();

}