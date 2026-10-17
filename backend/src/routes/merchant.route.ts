import type { Router } from 'express';
import express from 'express';
import { merchanteRegister } from '../controllers/auth.controller.js';
import { validateBodyRegister } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../errors/errors.js';

const merchantRouter: Router = express.Router();

merchantRouter.post('/register', validateBodyRegister, asyncHandler(merchanteRegister))

export default merchantRouter;