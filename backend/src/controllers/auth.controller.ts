import type { Request, Response } from 'express';
import { registerMerchantService } from '../services/auth.service.js';

export const merchanteRegister = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const accountLink = await registerMerchantService({ email, password });

    res.status(201).json({ data: accountLink });
}