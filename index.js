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
import { app, server } from "./socket/socket.js";
const port = process.env.PORT || 5000;

// Allow requests from specific origins and credentials
const corsOptions = {
    origin: 'http://localhost:7000',
    credentials: true,
};

dotenv.config({ path: '.env' });

app.use(express.json());
// Use CORS middleware
app.use(cors(corsOptions));
app.use(cookieParser());

// Api Route                      
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/messages', messageRoutes)
app.use('/api/v1/users', userRoutes)


server.listen(port, () => {
    connectDB();
    console.log(port, "running...")
});