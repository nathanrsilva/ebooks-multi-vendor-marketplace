import type { Request, Response } from 'express';
import type { CreateStoreRequestBody } from '../types/store.types.js';
import { createStoreService } from '../services/store.service.js';

export const createStore = async (req: Request<{}, unknown, CreateStoreRequestBody>, res: Response) => {
    const { store_name, store_description } = req.body;
    const { store_photo, store_banner } = req.validatedStoreFiles!;

    const storePhotoFile = store_photo[0]!;
    const storeBannerFile = store_banner[0]!;

    const store = await createStoreService({
        merchant_id: req.merchant!.id,
        store_name,
        store_description,
        store_photo: storePhotoFile,
        store_banner: storeBannerFile
    });

    return res.status(201).json({ data: store });
}