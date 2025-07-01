import express from 'express';
import { addLawReaction, getLawPost } from '../../controllers/User/lawPostController';
import { auth } from '../../middleware/auth';
import { addLawReactionValidator } from '../../middleware/validators/User/lawPostValidator';
import { validateRequest } from '../../middleware/validators/validationMiddleware';

const router = express.Router();

// Route pour créer une proposition de loi (accessible uniquement aux députés)
router.post('/:law_post_id/addLawReaction', auth, addLawReactionValidator, validateRequest, addLawReaction);
router.get('/:law_id', auth, getLawPost);

export default router;
