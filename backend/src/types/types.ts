export type NewMerchantType = {
    email: string;
    password: string;
    accountId: string;
}

export type PublicMerchant = {
    id: number;
    accountId: string;
}