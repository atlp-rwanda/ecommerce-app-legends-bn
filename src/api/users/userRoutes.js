import express from 'express';
import { verifyEmail, resetPassword} from '../../controllers/users/usersFunctions';
import userAuthController from '../../controllers/Auth/registerController';
import { updateUser } from '../../controllers/Auth/updateUser';
import { auth } from '../../middleware/auth';
import { authent } from '../../middleware/auth';

const router = express.Router();

router.post('/register', userAuthController.register)
.put('/users', auth('buyer'), updateUser); // update endpoint for user's own profile
router.post('/email', verifyEmail);
router.post('/password/:token',authent, resetPassword);

export default router;
