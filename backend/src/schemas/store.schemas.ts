import * as z from 'zod';

const maxFileSize = 5 * 1024 * 1024; // 5MB
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

// true -> ok
const storeImages = z.custom<Express.Multer.File>((file) => !!file, {
    error: 'The store_photo and store_banner fields is required.',
})
    .refine((file) => file?.size <= maxFileSize, {
        error: 'The maximum file size must be 5MB.'
    })
    .refine((file) => allowedMimeTypes.includes(file?.mimetype), {
        error: 'Only JPEG, PNG, and WEBP images are allowed.'
    })

export const UploadStoreFilesSchema = z.object({
    store_photo: z.array(storeImages, 'This field must be filled with an image file')
        .min(1).max(1),
    store_banner: z.array(storeImages, 'This field must be filled with an image file')
        .min(1).max(1),
})

export const StoreDetailsSchema = z.object({
    store_name: z.string('A string with a minimum of 4 characters and a maximum of 40 characters is expected')
        .min(4).max(40),
    store_description: z.string('A string with a minimum of 40 characters and a maximum of 100 characters is expected')
        .min(40).max(100)
})

export type UploadStoreFilesInput = z.infer<typeof UploadStoreFilesSchema>;