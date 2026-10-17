import multer from "multer";

const upload = multer();

export const uploadFiles = upload.fields([
    { name: 'store_photo', maxCount: 1 },
    { name: 'store_banner', maxCount: 1 },
])