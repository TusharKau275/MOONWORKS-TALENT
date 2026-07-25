import { Router } from 'express';
import { submitContact } from './contact.controller.js';
import { contactRateLimiter } from '../../middleware/rateLimiter.js';

export const contactRouter = Router();

contactRouter.post('/', contactRateLimiter, submitContact);
