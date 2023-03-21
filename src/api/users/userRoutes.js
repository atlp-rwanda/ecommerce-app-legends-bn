import express from 'express';
import { verifyEmail, resetPassword, resetPass} from '../../controllers/users/usersFunctions';
import userAuthController from '../../controllers/Auth/registerController';
import { updateUser } from '../../controllers/Auth/updateUser';
import { auth, authent } from '../../middleware/auth';

const router = express.Router();

router.post('/register', userAuthController.register)
router.put('/users', auth('buyer'), updateUser); // update endpoint for user's own profile
router.post('/email', verifyEmail);
router.post('/password/:token',authent, resetPassword);
router.post('/password',auth('all'), resetPass);

export default router;
