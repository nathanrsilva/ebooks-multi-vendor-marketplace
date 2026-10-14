import { pool } from "../config/db.config.js"
import type { MerchantRegister } from "../schemas/merchant.schema.js";

export const NewMerchant = async ({ email, password, accountId }: MerchantRegister) => {
    const query = `
    INSERT INTO merchant(merchant_email, merchant_password, stripe_account_id) 
    VALUES ($1, $2, $3)
    RETURNING merchant_email, stripe_account_id
    `;
    const result = await pool.query(query, [email, password, accountId]);
    return result.rows[0];
}

export const findMerchantByEmail = async (email: string) => {
    const query = `
    SELECT merchant_email FROM merchant WHERE merchant_email = $1
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0] ?? null;
}

