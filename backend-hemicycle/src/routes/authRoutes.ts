import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

// Routes d'authentification
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router; 