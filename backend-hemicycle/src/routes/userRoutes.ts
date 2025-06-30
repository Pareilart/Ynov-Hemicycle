import express from 'express';
import * as userController from '../controllers/userController';
import { auth, isAdmin } from '../middleware/auth';

const router = express.Router();

// Routes pour les utilisateurs
router.get('/', auth, isAdmin, userController.getAllUsers);
router.get('/:id', auth, isAdmin, userController.getUserById);
router.post('/', auth, isAdmin, userController.createUser);
router.put('/:id', auth, isAdmin, userController.updateUser);
router.delete('/:id', auth, isAdmin, userController.deleteUser);

export default router; 