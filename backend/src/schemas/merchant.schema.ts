import * as z from 'zod';

export const MerchantRegisterBodySchema = z.object({
    email: z.email(),
    password: z.string().trim().min(5)
})

export const MerchantRegisterSchema = z.object({
    email: z.email(),
    password: z.string().trim().min(5),
    accountId: z.string().trim().min(1)
})

export type MerchantRegisterBody = z.infer<typeof MerchantRegisterBodySchema>
export type MerchantRegister = z.infer<typeof MerchantRegisterSchema>