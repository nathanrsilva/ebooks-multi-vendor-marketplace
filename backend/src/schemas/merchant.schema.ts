import * as z from 'zod';

export const MerchantRegisterSchema = z.object({
    email: z.email(),
    password: z.string().trim().min(5)
})

export const MerchantLoginSchema = z.object({
    email: z.email(),
    password: z.string().trim().min(5)
})