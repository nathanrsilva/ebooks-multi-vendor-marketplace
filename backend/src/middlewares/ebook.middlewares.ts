import type { Request, Response, NextFunction } from "express";
import { EbookDetailsSchema, UploadEbookCoverSchema } from "../schemas/ebook.schemas.js";
import AppError from "../errors/AppError.js";

export const createEbookValidateBody = async (req: Request, res: Response, next: NextFunction) => {
    const ebookCoverResult = UploadEbookCoverSchema.safeParse(req.file);
    const ebookDetailsResult = EbookDetailsSchema.safeParse(req.body);

    if (!ebookCoverResult.success) {
        throw new AppError('File validation failed', 400, ebookCoverResult.error.issues);
    }

    if (!ebookDetailsResult.success) {
        throw new AppError('Ebook details validation failed', 400, ebookDetailsResult.error.issues);
    }

    req.validatedEbookCoverFile = ebookCoverResult.data;
    next();
}