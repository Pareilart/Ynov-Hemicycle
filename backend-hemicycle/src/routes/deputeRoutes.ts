import express from 'express';
import * as deputeController from '../controllers/deputeController';

const router = express.Router();

// Routes pour les députés
router.get('/', deputeController.getAllDeputes);
router.get('/:id', deputeController.getDeputeById);
router.post('/', deputeController.createDepute);
router.put('/:id', deputeController.updateDepute);
router.delete('/:id', deputeController.deleteDepute);

export default router; 