import { pool } from "../config/db.config.js";
import type { Ebook, NewEbook } from "../types/ebook.types.js";

export const newEbook = async (newEbookProps: NewEbook): Promise<Ebook | null> => {
    const {
        id,
        name,
        description,
        price,
        cover_url,
        price_id,
        product_id,
        store_id
    } = newEbookProps;

    const query = `
        INSERT INTO ebook(id, name, description, cover_url, price, product_id, price_id, store_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    `
    const result = await pool.query(
        query, [id, name, description, cover_url, price, product_id, price_id, store_id]
    );

    return result.rows[0] ?? null;
}

export const deleteEbookById = async (ebookId: string): Promise<Ebook | null> => {
    const query = `DELETE FROM ebook WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [ebookId]);
    return result.rows[0] ?? null;
}

export const findEbookByMerchantAndStoreId = async (ebookId: string, storeId: string): Promise<Ebook | null> => {
    const query = `SELECT * FROM ebook WHERE id = $1 AND store_id = $2`;
    const result = await pool.query(query, [ebookId, storeId]);
    return result.rows[0] ?? null;
}

export const findEbookById = async (ebookId: string): Promise<Ebook | null> => {
    const query = `SELECT * FROM ebook WHERE id = $1`;
    const result = await pool.query(query, [ebookId]);
    return result.rows[0] ?? null;
}

export const existsEbookByName = async (storeId: string, name: string) => {
    const query = `
        SELECT 1 FROM ebook 
        WHERE store_id = $1 AND name = $2 
        LIMIT 1;
    `;
    const result = await pool.query(query, [storeId, name]);
    return (result.rowCount ?? 0) > 0;
}