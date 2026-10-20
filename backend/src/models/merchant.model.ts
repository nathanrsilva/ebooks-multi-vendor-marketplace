import { pool } from "../config/db.config.js"
import type { Merchant, NewMerchant } from "../types/merchant.types.js";

export const newMerchant = async (newMerchantProps: NewMerchant) => {
    const { newMerchantId, email, password, account_id } = newMerchantProps;

    const query = `
    INSERT INTO merchant(id, email, password, account_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

    const result = await pool.query(query, [newMerchantId, email, password, account_id]);
    return result.rows[0];
}

export const findMerchantByEmail = async (email: string): Promise<Merchant | null> => {
    const query = 'SELECT * FROM merchant WHERE email = $1'
    const result = await pool.query(query, [email]);
    return result.rows[0] ?? null;
}

export const findMerchantByID = async (id: string): Promise<Merchant | null> => {
    const query = 'SELECT * FROM merchant WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] ?? null;
}

