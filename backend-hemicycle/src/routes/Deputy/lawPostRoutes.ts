import express from 'express';
import { createLawPost } from '../../controllers/Deputy/lawPostController';
import { auth, isDeputy } from '../../middleware/auth';

const router = express.Router();

// Route pour créer une proposition de loi (accessible uniquement aux députés)
router.post('/create', auth, isDeputy, createLawPost);

export default router; 