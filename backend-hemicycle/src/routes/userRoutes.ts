import express from 'express';
import * as userController from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Routes pour les utilisateurs
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router; 