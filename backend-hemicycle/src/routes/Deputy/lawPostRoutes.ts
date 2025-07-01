import express from 'express';
import { createLawPost } from '../../controllers/Deputy/lawPostController';
import { auth, isDeputy } from '../../middleware/auth';
import { createLawPostValidator } from '../../middleware/validators/Deputy/lawPostValidator';
import { validateRequest } from '../../middleware/validators/validationMiddleware';

const router = express.Router();

// Route pour créer une proposition de loi (accessible uniquement aux députés)
router.post('/create', auth, isDeputy, createLawPostValidator, validateRequest, createLawPost);

export default router;
