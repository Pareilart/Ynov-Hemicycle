import express from 'express';
import * as authController from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Routes d'authentification
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', auth, authController.me);

export default router; 