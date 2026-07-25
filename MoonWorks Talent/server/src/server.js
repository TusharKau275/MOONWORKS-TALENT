import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { contactRouter } from './features/contact/contact.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Allowed origins — update with your Vercel domain after deploy
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
].filter(Boolean);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Moonworks Talent API',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/contact', contactRouter);

// Error handler
app.use(errorHandler);

// Start
app.listen(PORT, () => {
  console.log(`🚀 Moonworks Talent API running on port ${PORT}`);
});

export default app;
