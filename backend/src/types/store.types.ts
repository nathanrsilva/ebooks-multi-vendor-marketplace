export type Store = {
    name: string;
    description: string;
    photo: string;
    banner: string;
    merchant_id: string;
}

export type CreateStoreProps = {
    store_name: string;
    store_description: string;
    store_photo: Express.Multer.File;
    store_banner: Express.Multer.File;
    merchant_id: string;
}

export type CreateStoreRequestBody = {
    store_name: string;
    store_description: string;
    merchant_id: string
}