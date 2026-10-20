import type { Request, Response } from 'express';
import { uploadToS3 } from '../services/aws.s3.service.js';
import { createEbookService } from '../services/ebook.service.js';
import type { CreateProduct } from '../types/product.types.js';

export const createEbook = async (req: Request<{}, unknown, CreateProduct>, res: Response) => {
    const ebookCoverFile = req.validatedEbookCoverFile!;

    const {
        name,
        description,
        price,
    } = req.body;

    const stripeAccountId = req.merchant!.accountId;
    const merchantId = req.merchant!.id;

    const ebookCoverUrl = await uploadToS3(ebookCoverFile, merchantId, 'ebook');
    const formattedPrice = Math.round(Number(price) * 100);

    const newEbook = await createEbookService({
        name,
        description,
        merchant_id: merchantId,
        price: formattedPrice,
        cover_url: ebookCoverUrl,
        accountId: stripeAccountId
    });

    return res.status(201).json({ data: newEbook });
}