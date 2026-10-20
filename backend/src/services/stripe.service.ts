import Stripe from 'stripe'
import type { Product } from '../types/product.types.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const stripeNewMerchant = async (email: string): Promise<string> => {
    const merchantAccount = await stripe.v2.core.accounts.create({
        display_name: email,
        contact_email: email,
        dashboard: "express",
        defaults: {
            responsibilities: {
                fees_collector: "application",
                losses_collector: "application",
            },
        },
        identity: {
            country: "BR",
            entity_type: "individual",
        },
        configuration: {
            merchant: {
                capabilities: {
                    card_payments: {
                        requested: true
                    }
                }
            },
        },
    });

    return merchantAccount.id;
}

export const accountOnboarding = async (accountId: string): Promise<string> => {
    const accountLink = await stripe.v2.core.accountLinks.create({
        account: accountId,
        use_case: {
            type: 'account_onboarding',
            account_onboarding: {
                refresh_url: `${process.env.BASE_URL}`,
                return_url: `${process.env.BASE_URL}/sucesso`
            }
        }
    })

    return accountLink.url;
}

export const findProductByNameService = async (accountId: string, productName: string) => {
    const searchResult = await stripe.products.search({
        query: `name:'${productName}'`,
        limit: 5
    }, { stripeContext: accountId })

    const exactMatch = searchResult.data.find(product => product.name.toLowerCase() === productName.toLowerCase())

    return exactMatch || null;
}

export const createProductAndPriceService = async (product: Product): Promise<{ stripeProduct: Stripe.Product, stripePrice: Stripe.Price }> => {
    const {
        name,
        description,
        image,
        price,
        accountId,
        merchantId
    } = product;

    const stripeProduct = await stripe.products.create({
        name,
        description,
        metadata: { stripeAccount: accountId },
        images: [image],
    }, { stripeContext: accountId });

    const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: price,
        currency: 'BRL',
        metadata: { stripeAccount: accountId }
    }, { stripeContext: accountId });

    return {
        stripeProduct,
        stripePrice
    }
}

export const checkMerchantReady = async (accountId: string) => {
    const account = await stripe.v2.core.accounts.retrieve(accountId, {
        include: ['configuration.merchant', 'requirements', 'future_requirements']
    });

    const cardPaymentStatus = account.configuration?.merchant?.capabilities?.card_payments?.status;
    const entries = account.requirements?.entries ?? []
    const hasNoPendingEntries = entries.length === 0;

    return cardPaymentStatus === 'active' && hasNoPendingEntries;
}

export const deleteProductAndPriceService = async () => { }