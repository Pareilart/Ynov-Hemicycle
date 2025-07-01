import express from 'express';
import { login, register, me, refreshToken } from '../../controllers/Auth/authController';
import { auth } from '../../middleware/auth';
import {
  loginValidator,
  registerValidator,
  refreshTokenValidator,
} from '../../middleware/validators/Auth/authValidator';
import { validateRequest } from '../../middleware/validators/validationMiddleware';

const router = express.Router();

// Routes d'authentification
router.post('/login', loginValidator, validateRequest, login);
router.post('/register', registerValidator, validateRequest, register);
router.post('/refresh-token', refreshTokenValidator, validateRequest, refreshToken);
router.get('/me', auth, me);

export default router;
