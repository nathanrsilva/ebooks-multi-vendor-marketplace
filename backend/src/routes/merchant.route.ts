import express from 'express';
import type { Router } from 'express';
import { merchantLogin, merchantRegister } from '../controllers/auth.controller.js';
import { validateLoginBody, validateRegisterBody } from '../middlewares/auth.middlewares.js';
import { asyncHandler } from '../errors/errors.js';

const merchantRouter: Router = express.Router();

merchantRouter.post('/register', validateRegisterBody, asyncHandler(merchantRegister))
merchantRouter.post('/login', validateLoginBody, asyncHandler(merchantLogin))

export default merchantRouter;