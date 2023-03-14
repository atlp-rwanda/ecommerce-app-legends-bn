import { googleAuthMiddleware, googleAuthCallbackMiddleware } from '../middleware/auth/google_auth';
import { loginWithGoogle } from '../controllers/login';
import express from 'express';

const router = express.Router();
router.get('/auth/google', googleAuthMiddleware);

router.get('/auth/google/redirect', googleAuthCallbackMiddleware, loginWithGoogle);

export default router;
