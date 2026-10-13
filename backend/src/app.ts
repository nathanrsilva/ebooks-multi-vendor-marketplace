import express from 'express';
import type { Express, Request, Response } from 'express'
const app: Express = express();

app.get('/', async (req: Request, res: Response) => {
    res.send('Hello world');
})

export default app;