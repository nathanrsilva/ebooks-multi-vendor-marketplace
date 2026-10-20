import type { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError.js";
import { StoreDetailsSchema, UploadStoreFilesSchema } from "../schemas/store.schemas.js";

export const createStoreValidateBody = (req: Request, res: Response, next: NextFunction) => {
    const fileResult = UploadStoreFilesSchema.safeParse(req.files);
    const detailsResult = StoreDetailsSchema.safeParse(req.body);

    if (!fileResult.success) {
        throw new AppError('File validation failed', 400, fileResult.error.issues);
    }

    if (!detailsResult.success) {
        throw new AppError('Store details validation failed', 400, detailsResult.error.issues);
    }

    req.validatedStoreFiles = fileResult.data;
    next();
}