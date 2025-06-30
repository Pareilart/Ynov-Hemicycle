import express from 'express';
import { createLawPost, addLawReaction } from '../controllers/lawPostController';
import { auth, isDeputy } from '../middleware/auth';

const router = express.Router();

// Route pour créer une proposition de loi (accessible uniquement aux députés)
router.post('/create', auth, isDeputy, createLawPost);
router.post('/:law_post_id/addLawReaction', auth, addLawReaction);

export default router; 