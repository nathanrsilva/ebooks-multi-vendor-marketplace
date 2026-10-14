import { pool } from "../config/db.config.js"

export const NewMerchant = async (
    { email, password, stripe_account_id }:
        { email: string; password: string; stripe_account_id: string }
) => {
    const query = `
    INSERT INTO merchant(email, password, stripe_account_id) 
    VALUES ($1, $2, $3)
    RETURNING email, stripe_account_id
    `;
    const result = await pool.query(query, [email, password, stripe_account_id]);
    return result.rows[0];
}

export const findMerchantByEmail =
    async (email: string): Promise<{ id: number; email: string; password: string; stripe_account_id: string }> => {
        const query = `
    SELECT email, stripe_account_id FROM merchant WHERE email = $1
    `;
        const result = await pool.query(query, [email]);
        return result.rows[0] ?? null;
    }

