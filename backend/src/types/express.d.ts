import type { UploadStoreFilesInput } from "../schemas/merchant.schema.ts"

declare global {
    namespace Express {
        interface Request {
            validatedFiles?: UploadStoreFilesInput
        }
    }
}

export { };