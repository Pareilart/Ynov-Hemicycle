import express from 'express';
import { createLawPost, addLawReaction, getLawPost } from '../controllers/lawPostController';
import { auth, isDeputy } from '../middleware/auth';

const router = express.Router();

// Route pour créer une proposition de loi (accessible uniquement aux députés)
router.post('/create', auth, isDeputy, createLawPost);
router.post('/:law_post_id/addLawReaction', auth, addLawReaction);
router.get('/:law_id', auth, getLawPost);

export default router; 