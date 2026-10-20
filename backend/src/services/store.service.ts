import AppError from "../errors/AppError.js";
import { findMerchantByID } from "../models/merchant.model.js";
import { findStoreByMerchantId, findStoreByName, newStore } from "../models/store.model.js";
import type { CreateStoreProps } from "../types/store.types.js";
import { uploadToS3 } from "./aws.s3.service.js";
import { checkMerchantReady } from "./stripe.service.js";

export const createStoreService = async (createStoreProps: CreateStoreProps) => {

    const {
        store_name,
        store_description,
        store_photo,
        store_banner,
        merchant_id
    } = createStoreProps;

    const selectedMerchant = await findMerchantByID(merchant_id);
    if (!selectedMerchant) throw new AppError('The merchant does not exist', 404);

    const selectedMerchantStore = await findStoreByMerchantId(merchant_id);
    if (selectedMerchantStore) throw new AppError('The merchant already has a store', 409);

    const isReady = await checkMerchantReady(selectedMerchant.account_id);

    if (!isReady) throw new AppError(
        `Merchant account ${selectedMerchant.account_id} has pending issues (incomplete onboarding). Complete the process before creating a store`, 403
    );

    const selectedStoreName = await findStoreByName(store_name);
    if (selectedStoreName) throw new AppError('There is already a store with that same name', 409);

    const [storePhotoUrl, storeBannerUrl] = await Promise.all([
        uploadToS3(store_photo, merchant_id, 'store'),
        uploadToS3(store_banner, merchant_id, 'store')
    ]);

    const createdStore = await newStore({
        merchant_id: merchant_id,
        name: store_name,
        description: store_description,
        photo_url: storePhotoUrl,
        banner_url: storeBannerUrl
    });

    return createdStore;
}