import { googleAuthMiddleware, googleAuthCallbackMiddleware } from '../../middleware/google_oauth';
import { loginWithGoogle } from '../../controllers/Auth/google_oauth';
import { isUserEnabled } from '../../middleware/auth';
import express from 'express';

const router = express.Router();
router.get('/auth/google', googleAuthMiddleware);

router.get('/auth/google/redirect', googleAuthCallbackMiddleware, loginWithGoogle);

export default router;
