import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import connectDB from './db/connectDB.js';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { connectDB } from './db/connectDB.js';
const port = process.env.PORT || 5000;


dotenv.config({ path: '.env' });

const app = express();
app.use(express.json());
// Allow requests from specific origins and credentials
const corsOptions = {
    origin: 'http://localhost:7000',
    credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(cookieParser());


app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/messages', messageRoutes)
app.use('/api/v1/users', userRoutes)


app.listen(port, () => {
    connectDB();
    console.log(port, "running...")
});