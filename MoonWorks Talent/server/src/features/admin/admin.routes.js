import { Router } from 'express';
import { getSubmissions } from './admin.controller.js';

export const adminRouter = Router();

adminRouter.get('/submissions', getSubmissions);
