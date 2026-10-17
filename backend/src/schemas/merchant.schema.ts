import * as z from 'zod';
import { fi } from 'zod/locales';

export const MerchantRegisterSchema = z.object({
    email: z.email(),
    password: z.string().trim().min(5)
})

export const MerchantLoginSchema = z.object({
    email: z.email(),
    password: z.string().trim().min(5)
})

const maxFileSize = 5 * 1024 * 1024; // 5MB
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

// true -> ok!
const storeImages = z.custom<Express.Multer.File>((file) => !!file, {
    error: 'The file is required'
})
    .refine((file) => file?.size <= maxFileSize, {
        error: 'The max size is 5MB!'
    })
    .refine((file) => allowedMimeTypes.includes(file?.mimetype), {
        error: 'Only JPEG, PNG, and WEBP images are allowed.'
    })

export const UploadStoreFilesSchema = z.object({
    store_photo: z.array(storeImages).min(1, 'Store photo is required!').max(1),
    store_banner: z.array(storeImages).min(1, 'Store banner is required!').max(1),
})

export const StoreDetailsSchema = z.object({
    store_name: z.string().min(4),
    store_description: z.string().min(15)
})

export type UploadStoreFilesInput = z.infer<typeof UploadStoreFilesSchema>;