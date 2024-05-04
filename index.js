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

console.log(dotenv.config().parsed.PORT);

const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser());


app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/messages', messageRoutes)
app.use('/api/v1/users', userRoutes)


app.listen(port, () => {
    connectDB();
    console.log(port, "running...")
});