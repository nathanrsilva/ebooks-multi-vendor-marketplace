import * as z from 'zod';

export const MerchantRegisterSchema = z.object({
    email: z.email(),
    password: z.string('This field is required').trim().min(15, 'The minimun number of characters is 15').max(150)
})

export const MerchantLoginSchema = z.object({
    email: z.email(),
    password: z.string('This field is required').trim().min(1).max(150, 'Maximum number of characters')
})

export const MerchantTokenPayloadJWT = z.object({
    id: z.uuid(),
    accountId: z.string().min(1),
    iat: z.number().min(1),
    exp: z.number().min(1)
})

export type MerchantLogin = z.infer<typeof MerchantRegisterSchema>;