import { pool } from "../config/db.config.js";
import type { Store } from "../types/store.types.js";

export const newStore = async ({ merchant_id, name, description, photo, banner }: Store): Promise<Store | null> => {
    const query = `
        INSERT INTO store(merchant_id, name, description, photo, banner)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING merchant_id, name, description, photo, banner
    `
    const result = await pool.query(query, [merchant_id, name, description, photo, banner])
    return result.rows[0] ?? null;
}

export const findStoreByMerchantId = async (merchantId: string): Promise<Store | null> => {
    const query = 'SELECT * FROM store WHERE merchant_id = $1';
    const result = await pool.query(query, [merchantId]);
    return result.rows[0] ?? null;
}

export const findStoreByName = async (storeName: string): Promise<Store | null> => {
    const query = 'SELECT * FROM store WHERE name = $1';
    const result = await pool.query(query, [storeName]);
    return result.rows[0] ?? null;
}