import type { Request, Response } from 'express';
import { loginMerchantService, registerMerchantService } from '../services/auth.service.js';
import type { MerchantLogin } from '../schemas/merchant.schemas.js';
import AppError from '../errors/AppError.js';
import { findMerchantByEmail } from '../models/merchant.model.js';

export const merchantRegister = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (req.cookies.auth_token) throw new AppError('A merchant is already logged in', 400);

    const accountLink = await registerMerchantService({ email, password });

    res.status(201).json({ data: accountLink });
}

export const merchantLogin = async (req: Request<{}, unknown, MerchantLogin>, res: Response) => {
    const { email, password } = req.body;

    if (req.cookies.auth_token) throw new AppError('Merchant already logged in', 400);

    const token = await loginMerchantService({ email, password });

    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    })

    res.status(200).send(`Merchant logged in successfully!`);
}