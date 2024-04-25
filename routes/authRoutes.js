import express from 'express';
import { login, logout, signup } from '../controllers/authController.js';

const router = express.Router();

// Sign up route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

// Forgot password route
router.post('/forgot', );

// Reset password route
router.post('/reset', );


export default router;
