import express from "express";
import { auth } from "../../middleware/auth";
import {
  deleteUser,
  getProfile,
  updateProfile,
  userOnboarding,
  exportProfile,
} from "../../controllers/User/userController";
import { updateProfileValidator } from "../../middleware/validators/User/userValidator";
import { validateRequest } from "../../middleware/validators/validationMiddleware";

const router = express.Router();

// Routes pour les utilisateurs
router.post("/onboarding", auth, userOnboarding);

/**
 * Profil utilisateur
 */
router.put(
  "/profile/update",
  auth,
  updateProfileValidator,
  validateRequest,
  updateProfile
);
router.get("/profile", auth, getProfile);
router.delete("/profile/delete", auth, deleteUser);
router.get("/profile/export-data", auth, exportProfile);

export default router;
