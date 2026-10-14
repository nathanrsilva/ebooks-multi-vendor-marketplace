import AppError from "../errors/AppError.js";
import { findMerchantByEmail, NewMerchant } from "../models/merchant.model.js"
import bcrypt from 'bcrypt';
import { accountOnboarding, stripeNewMerchant } from "./stripe.service.js";
import type { MerchantRegisterBody } from "../schemas/merchant.schema.js";

export const registerMerchantService = async ({ email, password }: MerchantRegisterBody) => {
    const selected = await findMerchantByEmail(email);
    if (selected) throw new AppError('Email already exists', 409);

    const cryptedPassword = await bcrypt.hash(password, 10);

    const accountId = await stripeNewMerchant(email);
    const accountLink = await accountOnboarding(accountId);

    await NewMerchant({ email, password: cryptedPassword, accountId });

    return accountLink;
}