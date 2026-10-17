import type { Request, Response, NextFunction } from "express";
import { StoreDetailsSchema, UploadStoreFilesSchema } from "../schemas/merchant.schema.js";
import AppError from "../errors/AppError.js";

export const createStoreValidateBody = (req: Request, res: Response, next: NextFunction) => {
    const fileResult = UploadStoreFilesSchema.safeParse(req.files);
    const detailsResult = StoreDetailsSchema.safeParse(req.body);

    if (!fileResult.success) {
        throw new AppError('File validation failure', 400, fileResult.error.issues);
    }

    if (!detailsResult.success) {
        throw new AppError('Store details validation failure', 400, detailsResult.error.issues);
    }

    req.validatedFiles = fileResult.data;
    next();
}