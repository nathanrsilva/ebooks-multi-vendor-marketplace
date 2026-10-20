export type NewEbook = {
    id: string;
    name: string;
    description: string;
    cover_url: string;
    price: number;
    product_id: string;
    price_id: string;
    store_id: string
}

export type Ebook = {
    id: string;
    name: string;
    description: string;
    cover_url: string;
    price: number;
    product_id: string;
    price_id: string;
    store_id: string
}

export type CreateEbook = {
    name: string;
    description: string;
    cover_url: string;
    price: number;
    merchant_id: string;
    accountId: string;
}