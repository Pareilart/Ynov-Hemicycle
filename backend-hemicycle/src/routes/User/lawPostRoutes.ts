import express from 'express';
import { addLawReaction, getLawPost, reportLawPost } from '../../controllers/User/lawPostController';
import { addLawReactionValidator, reportLawPostValidator } from '../../middleware/validators/User/lawPostValidator';
import { validateRequest } from '../../middleware/validators/validationMiddleware';
import { auth } from '../../middleware/auth';

const router = express.Router();

// Route pour créer une proposition de loi (accessible uniquement aux députés)
router.post('/:lawPostId/addLawReaction', auth, addLawReactionValidator, validateRequest, addLawReaction);
router.get('/:lawPostId', auth, getLawPost);
router.post('/:lawPostId/report', auth, reportLawPostValidator, validateRequest, reportLawPost);

export default router;
