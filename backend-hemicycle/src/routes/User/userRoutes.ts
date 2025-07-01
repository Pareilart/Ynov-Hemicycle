import express from 'express';
import { userOnboarding } from '../../controllers/User/userController';
import { auth } from '../../middleware/auth';

const router = express.Router();

// Routes pour les utilisateurs
router.post('/onboarding', auth, userOnboarding);

export default router; 