import express from 'express';
import { addLawReaction, getLawPost } from '../../controllers/User/lawPostController';
import { auth } from '../../middleware/auth';

const router = express.Router();

// Route pour créer une proposition de loi (accessible uniquement aux députés)
router.post('/:law_post_id/addLawReaction', auth, addLawReaction);
router.get('/:law_id', auth, getLawPost);

export default router; 