import express from 'express';
import { sendTestEmail } from '../controllers/emailController';

const router = express.Router();

// Route pour créer une proposition de loi (accessible uniquement aux députés)
router.post('/test-email', sendTestEmail);

export default router;
