import express from 'express';
import { verifyEmail, resetPassword, resetPass, updatePassword} from '../../controllers/users/usersControllers';
import userAuthController from '../../controllers/Auth/registerController';
import { updateUser } from '../../controllers/Auth/updateUser';
import { auth, authent } from '../../middleware/auth';
import { isUserEnabled } from '../../middleware/auth';


const router = express.Router();

router.post('/register', userAuthController.register)
router.put('/users', auth('buyer'),isUserEnabled, updateUser); // update endpoint for user's own profile
router.post('/email', verifyEmail);
router.post('/password/:token',authent, resetPassword);
// router.post('/password',auth('all'), isUserEnabled, resetPass);
router.put('/users/password/update',auth('all'), isUserEnabled, updatePassword);

export default router;
