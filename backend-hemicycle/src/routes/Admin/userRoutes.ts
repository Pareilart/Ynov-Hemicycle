import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/Admin/userController';
import { auth, isAdmin } from '../../middleware/auth';

const router = express.Router();

// Routes pour les utilisateurs
router.get('/all', auth, isAdmin, getAllUsers);
router.get('/:id', auth, isAdmin, getUserById);
router.post('/create', auth, isAdmin, createUser);
router.put('/update/:id', auth, isAdmin, updateUser);
router.delete('/delete/:id', auth, isAdmin, deleteUser);

export default router; 