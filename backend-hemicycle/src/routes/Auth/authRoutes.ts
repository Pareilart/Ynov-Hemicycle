import express from 'express';
import {
  login,
  register,
  me,
  refreshToken,
  verify2FACode,
} from '../../controllers/Auth/authController';
import { auth } from '../../middleware/auth';
import {
  loginValidator,
  registerValidator,
  refreshTokenValidator,
  verify2FACodeValidator,
} from '../../middleware/validators/Auth/authValidator';
import { validateRequest } from '../../middleware/validators/validationMiddleware';

const router = express.Router();

// Routes d'authentification
router.post('/login', loginValidator, validateRequest, login);
router.post('/register', registerValidator, validateRequest, register);
router.post('/refresh-token', refreshTokenValidator, validateRequest, refreshToken);
router.get('/me', auth, me);
router.post('/verify-2fa-code', verify2FACodeValidator, validateRequest, verify2FACode);

export default router;
