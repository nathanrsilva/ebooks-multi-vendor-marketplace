import express from 'express';
import type { Router } from 'express';
import { createStore } from '../controllers/store.controller.js';
import { asyncHandler } from '../errors/errors.js';
import { createStoreValidateBody } from '../middlewares/store.middleware.js';
import { uploadFiles } from '../middlewares/multer.middleware.js';

const storeRouter: Router = express.Router();

storeRouter.post('/create_store', uploadFiles, createStoreValidateBody, asyncHandler(createStore));

export default storeRouter;