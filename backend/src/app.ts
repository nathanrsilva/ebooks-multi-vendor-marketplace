import express from 'express';
import type { Express, Request, Response } from 'express'
import { pool } from './config/db.config.js';
const app: Express = express();

app.get('/', async (req: Request, res: Response) => {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows);
})

export default app;