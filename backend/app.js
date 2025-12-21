import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import dotenv from 'dotenv';

import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import errorHandleMiddleware from './middleware/error.js';

dotenv.config({ path: './config/config.env' });

const app = express();
const __dirname = path.resolve();

// ✅ CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://zorodealss.onrender.com'
  ],
  credentials: true
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// ✅ API routes
app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// ✅ SPA fallback (
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/dist/index.html'));
});


app.use(errorHandleMiddleware);

export default app;
