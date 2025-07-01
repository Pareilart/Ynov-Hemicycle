import express from 'express';
import {sendWelcomeEmailToUser } from '../controllers/emailController';
const router = express.Router();

// Route pour envoyer un email de bienvenue à un utilisateur spécifique
router.post('/welcome', sendWelcomeEmailToUser);

export default router;
