import { randomUUIDv7 } from 'node:crypto';
import { deleteEbookById, existsEbookByName, findEbookByMerchantAndStoreId, newEbook } from '../models/ebook.model.js';
import { archiveProductService, checkMerchantReady, createProductAndPriceService } from './stripe.service.js';
import AppError from '../errors/AppError.js';
import { findStoreByMerchantId } from '../models/store.model.js';
import type { CreateEbook } from '../types/ebook.types.js';
import { deleteObjectsService } from './aws.s3.service.js';

export const createEbookService = async (ebookProps: CreateEbook) => {
    const {
        name,
        description,
        cover_url,
        price,
        merchant_id,
        accountId
    } = ebookProps;

    const isReady = await checkMerchantReady(accountId);
    if (!isReady) throw new AppError(
        `Merchant account ${accountId} has pending issues (incomplete onboarding). Complete the process before creating a ebook`, 403
    );

    const selectedMerchantStore = await findStoreByMerchantId(merchant_id);
    if (!selectedMerchantStore) throw new AppError(
        'The merchant does not have a store. Create one, before creating an Ebook', 403
    );

    const ebookExists = await existsEbookByName(merchant_id, name);
    if (ebookExists) {
        throw new AppError(
            `Merchant account ${accountId} already has an ebook with that name.`, 409
        );
    }

    const { stripeProduct, stripePrice } = await createProductAndPriceService({
        name,
        description,
        image: cover_url,
        price,
        accountId,
        merchantId: merchant_id
    });

    const newEbookId = randomUUIDv7();

    const createdEbook = await newEbook({
        id: newEbookId,
        name,
        description,
        cover_url,
        price,
        product_id: stripeProduct.id,
        price_id: stripePrice.id,
        store_id: merchant_id
    })

    return createdEbook;
}

export const deleteEbookService = async (ebookId: string, account_id: string, merchant_id: string) => {
    const selectedEbook = await findEbookByMerchantAndStoreId(ebookId, merchant_id);
    if (!selectedEbook) throw new AppError(`Merchant ${merchant_id} does not have the Ebook with id: ${ebookId}`, 404)

    await archiveProductService(selectedEbook.product_id, account_id);

    // deletar os arquivos no aws
    await deleteObjectsService([selectedEbook.cover_url]);

    const deletedEbook = await deleteEbookById(ebookId);
    return deletedEbook;
}   