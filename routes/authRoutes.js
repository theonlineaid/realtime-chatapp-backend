import express from 'express';
import authCtrl from '../controllers/authController.js';

const router = express.Router();

// Sign up route
router.post('/signup', authCtrl.signup);

// Login route
router.post('/login', authCtrl.login);

// Logout route
router.post('/logout', authCtrl.logout);

// Forgot password route
router.post('/forgot', );

// Reset password route
router.post('/reset', );


export default router;
