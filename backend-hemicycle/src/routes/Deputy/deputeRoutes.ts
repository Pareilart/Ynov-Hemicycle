import express from 'express';
import * as deputeController from '../../controllers/deputeController';
import { auth } from '../../middleware/auth';

const router = express.Router();

// Routes pour les députés
router.get('/', auth, deputeController.getAllDeputes);
router.get('/:id', auth, deputeController.getDeputeById);
router.post('/', auth, deputeController.createDepute);
router.put('/:id', auth, deputeController.updateDepute);
router.delete('/:id', auth, deputeController.deleteDepute);

export default router; 