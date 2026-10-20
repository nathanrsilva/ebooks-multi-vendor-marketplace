import express from 'express';
import type { Router } from "express";
import { asyncHandler } from '../errors/errors.js';
import multer from 'multer';
import { createEbookValidateBody, deleteEbookValidateParams } from '../middlewares/ebook.middlewares.js';
import { createEbook, deleteEbook } from '../controllers/ebook.controller.js';

const ebookRouter: Router = express.Router();

const upload = multer();
const uploadEbookCover = upload.single('ebook_cover')

ebookRouter.post('/create', uploadEbookCover, createEbookValidateBody, asyncHandler(createEbook));
ebookRouter.delete('/delete/:ebookId', deleteEbookValidateParams, asyncHandler(deleteEbook));

export default ebookRouter;