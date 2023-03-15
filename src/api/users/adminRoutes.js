import express from 'express';
import { login } from '../../controllers/login';
import { auth } from '../../middleware/auth';
import {
  getAllUsers,
  createAdmin,
  deleteUsers,
  getSingleUser,
} from '../../controllers/users/adminFunctions';
const router = express.Router();

router.post('/api/admin/login', login);
router.get('/api/admin/users', auth('admin'), getAllUsers);
router.get('/api/admin/users/:id', auth('admin'), getSingleUser);
router.post('/api/admin/users', createAdmin);
router.delete('/api/admin/users/:id', auth('admin'), deleteUsers);

export default router;
