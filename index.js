import express from 'express';
import dotenv from 'dotenv';
// import connectDB from './db/connectDB.js';

import { connectDB } from './db/connectDB.js';
const port = process.env.PORT || 5000;

console.log(dotenv.config().parsed.PORT);
const app = express();
app.use(express.json());

import authRoutes from './routes/authRoutes.js';

app.use('/api/v1/auth', authRoutes)


app.listen(port, () => {
    connectDB();
    console.log(port, "running...")
});