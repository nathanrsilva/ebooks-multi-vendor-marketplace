export type Merchant = {
    id: string;
    email: string;
    password: string;
    stripe_account_id: string
}

export type NewMerchant = {
    newMerchantId: string;
    email: string;
    password: string;
    stripe_account_id: string
}

export type PublicMerchant = {
    id: string;
    email: string;
    stripe_account_id: string;
}