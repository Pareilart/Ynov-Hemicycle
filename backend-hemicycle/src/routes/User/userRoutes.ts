import express from 'express';
import { auth, isEmailVerified } from '../../middleware/auth';
import {
  deleteUser,
  getProfile,
  updateProfile,
  userOnboarding,
  exportProfile,
  toggleTwoFactor,
} from '../../controllers/User/userController';
import { exportDataProfileValidator, updateProfileValidator } from '../../middleware/validators/User/userValidator';
import { validateRequest } from '../../middleware/validators/validationMiddleware';

const router = express.Router();

// Routes pour les utilisateurs
router.post('/onboarding', auth, userOnboarding);

/**
 * Profil utilisateur
 */
router.put(
  '/profile/update',
  auth,
  updateProfileValidator,
  validateRequest,
  updateProfile,
);
router.get('/profile', auth, getProfile);
router.delete('/profile/delete', auth, deleteUser);
router.post('/profile/export-data', auth, exportDataProfileValidator, validateRequest, exportProfile);
router.post('/profile/toggle-2fa', auth, isEmailVerified, toggleTwoFactor);

export default router;
