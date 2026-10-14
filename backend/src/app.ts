import express from 'express';
import type { Express, Request, Response } from 'express'
import { pool } from './config/db.config.js';
import merchantRoute from './routes/merchant.route.js';

const app: Express = express();

app.use(express.json());
app.use('/merchant', merchantRoute);

app.get('/', async (req: Request, res: Response) => {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows);
})

export default app;