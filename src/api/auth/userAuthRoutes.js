import userAuthController from '../../controllers/auth/registerController';
import express from 'express';

const router = express.Router();

router
.post('/register', userAuthController.register)

export default router;
