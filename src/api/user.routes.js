import userController from '../controllers/user_controller';
import express from 'express';

const router = express.Router();

router
.post('/add', userController.createUser)
.get('/all', userController.getUser);

export default router;
