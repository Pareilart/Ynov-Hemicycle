import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, userOnboarding } from '../controllers/userController';
import { auth, isAdmin } from '../middleware/auth';

const router = express.Router();

// Routes pour les utilisateurs
router.get('/', auth, isAdmin, getAllUsers);
router.get('/:id', auth, isAdmin, getUserById);
router.post('/', auth, isAdmin, createUser);
router.put('/:id', auth, isAdmin, updateUser);
router.delete('/:id', auth, isAdmin, deleteUser);
router.post('/onboarding', auth, userOnboarding);

export default router; 