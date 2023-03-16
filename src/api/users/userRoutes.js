import express from 'express';
import { verifyEmail, resetPassword} from '../../controllers/users/usersFunctions';
import userAuthController from '../../controllers/Auth/registerController';
import { authent } from '../../middleware/auth';

const router = express.Router();

router.post('/register', userAuthController.register)
router.post('/email', verifyEmail);
router.post('/password/:token',authent, resetPassword);

export default router;