import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/Admin/userController';
import { auth, isAdmin } from '../../middleware/auth';
import { createUserValidator, updateUserValidator } from '../../middleware/validators/Admin/userValidator';
import { validateRequest } from '../../middleware/validators/validationMiddleware';

const router = express.Router();

// Routes pour les utilisateurs
router.get('/all', auth, isAdmin, getAllUsers);
router.get('/:id', auth, isAdmin, getUserById);
router.post('/create', auth, isAdmin, createUserValidator, validateRequest, createUser);
router.put('/update/:id', auth, isAdmin, updateUserValidator, validateRequest, updateUser);
router.delete('/delete/:id', auth, isAdmin, deleteUser);

export default router; 