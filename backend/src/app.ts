import express from 'express';
import type { Express, Request, Response } from 'express'
import { pool } from './config/db.config.js';
import merchantRouter from './routes/merchant.route.js';
import { errorHandler } from './errors/errors.js';
import storeRouter from './routes/store.route.js';

// Setup
const app: Express = express();
app.use(express.json());

// Routers
app.use('/merchant', merchantRouter);
app.use('/store', storeRouter);

app.get('/', async (req: Request, res: Response) => {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows);
})

// General
app.use(errorHandler);

export default app;