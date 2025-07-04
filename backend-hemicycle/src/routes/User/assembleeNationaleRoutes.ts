import express from 'express';
import { auth } from '../../middleware/auth';
import { getDeputes } from '../../controllers/User/assembleeNationaleController';

const router = express.Router();

/**
 * Route pour récupérer la liste des députés
 * @route GET /api/user/assemblee-nationale/deputes
 * @returns {Promise<Array>} Liste des députés
 * @access Private
 */
router.get('/deputes/all', auth, getDeputes);

export default router;
