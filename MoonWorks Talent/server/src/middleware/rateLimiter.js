import rateLimit from 'express-rate-limit';

// Rate limit contact form submissions: max 5 per 15 minutes per IP
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { message: 'Too many submissions. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});
