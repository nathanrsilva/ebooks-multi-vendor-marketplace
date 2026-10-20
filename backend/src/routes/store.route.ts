import express from 'express';
import multer from "multer";
import type { Router } from 'express';
import { createStore } from '../controllers/store.controller.js';
import { asyncHandler } from '../errors/errors.js';
import { createStoreValidateBody } from '../middlewares/store.middlewares.js';

const storeRouter: Router = express.Router();
const upload = multer();

export const uploadFiles = upload.fields([
    { name: 'store_photo', maxCount: 1 },
    { name: 'store_banner', maxCount: 1 },
])

storeRouter.post('/create_store', uploadFiles, createStoreValidateBody, asyncHandler(createStore));

export default storeRouter;