import AppError from "../errors/AppError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findMerchantByEmail, newMerchant } from "../models/merchant.model.js"
import { accountOnboarding, stripeNewMerchant } from "./stripe.service.js";

import { randomUUIDv7 } from 'node:crypto';

export const registerMerchantService = async ({ email, password }: { email: string, password: string }) => {
    const selected = await findMerchantByEmail(email);
    if (selected) throw new AppError('Email already exists', 409);

    const cryptedPassword = await bcrypt.hash(password, 10);

    // stripe cria um mercado
    const account_id = await stripeNewMerchant(email);

    // link para o mercador completar sua conta
    const accountLink = await accountOnboarding(account_id);

    // meu banco de dados registra um novo mercador
    const newMerchantId = randomUUIDv7();
    await newMerchant({ newMerchantId, email, password: cryptedPassword, account_id });

    return accountLink;
}

export const loginMerchantService = async ({ email, password }: { email: string, password: string }) => {
    const selected = await findMerchantByEmail(email);
    if (!selected) throw new AppError('Invalid Credentials', 401);

    const passwordMatches = await bcrypt.compare(password, selected.password);

    if (!passwordMatches) throw new AppError('Invalid Credentials', 401);

    const jwtPayload = {
        id: selected.id,
        accountId: selected.account_id
    }

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, { expiresIn: '1d' });

    return token;
}