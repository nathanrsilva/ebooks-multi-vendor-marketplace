import type { UploadStoreFilesInput } from "../schemas/merchant.schemas.ts"
import type { ProductDetails, UploadEbookCover } from "../schemas/ebook.schemas.ts";
import type { RequestMerchant } from "./merchant.types.ts";

declare global {
    namespace Express {
        interface Request {
            validatedStoreFiles?: UploadStoreFilesInput
            validatedEbookCoverFile?: UploadEbookCover,
            merchant?: RequestMerchant
        }
    }
}

export { };