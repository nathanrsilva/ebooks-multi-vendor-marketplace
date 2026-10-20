export type Merchant = {
    id: string;
    email: string;
    password: string;
    account_id: string
}

export type NewMerchant = {
    newMerchantId: string;
    email: string;
    password: string;
    account_id: string
}

export type RequestMerchant = {
    id: string;
    accountId: string;
}