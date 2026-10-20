export type Product = {
    name: string;
    description: string;
    price: number;
    image: string;
    accountId: string;
    merchantId: string;
}

export type CreateProduct = {
    name: string;
    description: string;
    price: string;
}