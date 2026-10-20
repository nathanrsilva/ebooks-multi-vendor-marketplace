import * as z from 'zod';

const maxFileSize = 5 * 1024 * 1024; // 5MB
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

const ebookCover = z.custom<Express.Multer.File>((file) => !!file, {
    error: 'This field is required',
    path: ['ebook_cover']
})
    .refine((file) => file.size <= maxFileSize, {
        error: 'The maximum file size must be 5MB.',
        path: ['ebook_cover']
    })
    .refine((file) => allowedMimeTypes.includes(file.mimetype), {
        error: 'Only JPEG, PNG, and WEBP images are allowed.',
        path: ['ebook_cover']
    })

export const UploadEbookCoverSchema = ebookCover;

export const EbookDetailsSchema = z.object({
    name: z.string('A string with a minimum of 4 characters and a maximum of 80 characters is expected')
        .min(4).max(80),
    description: z.string('A string with a minimum of 30 characters and a maximum of 100 characters is expected')
        .min(30).max(100),
    price: z.coerce.number('Expected a number value')
        .min(10, 'The minimum price is R$10.00'),
})

export type UploadEbookCover = z.infer<typeof UploadEbookCoverSchema>;



