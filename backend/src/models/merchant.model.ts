import { pool } from "../config/db.config.js"
import type { Merchant, NewMerchant } from "../types/merchant.types.js";

export const newMerchant = async (newMerchantProps: NewMerchant) => {
    const { newMerchantId, email, password, stripe_account_id } = newMerchantProps;

    const query = `
    INSERT INTO merchant(id, email, password, stripe_account_id) 
    VALUES ($1, $2, $3, $4)
    RETURNING email, stripe_account_id
    `;
    const result = await pool.query(query, [newMerchantId, email, password, stripe_account_id]);
    return result.rows[0];
}

export const findMerchantByEmail = async (email: string): Promise<Merchant | null> => {
    const query = 'SELECT id, email, stripe_account_id FROM merchant WHERE email = $1'
    const result = await pool.query(query, [email]);
    return result.rows[0] ?? null;
}

export const findMerchantByID = async (id: string): Promise<Merchant | null> => {
    const query = 'SELECT id, email, stripe_account_id FROM merchant WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] ?? null;
}

