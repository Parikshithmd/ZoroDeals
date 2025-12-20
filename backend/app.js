import express from 'express';
import cors from 'cors'; 
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import errorHandleMiddleware  from './middleware/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv'
const app=express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://zorodeals-frontends.onrender.com' // frontend
  ],
  credentials: true
}));

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }));

// Route
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)

app.use(errorHandleMiddleware)
dotenv.config({path:'./config/config.env'})
export default app;
