import express from 'express';
import userAuthController from '../../controllers/Auth/registerController';

const router = express.Router();

router
.post('/register', userAuthController.register)

export default router;