import { createUser } from '../controllers/user_controller';
import express from 'express';

const router = express.Router();

router.post('/user/post', createUser);

export default router;
