import express from 'express';
import userAuthController from '../../controllers/Auth/registerController';
import { updateUser } from '../../controllers/Auth/updateUser';
import { auth } from '../../middleware/auth';

const router = express.Router();

router
.post('/register', userAuthController.register)
.put('/users', auth('buyer'), updateUser); // update endpoint for user's own profile

export default router;
