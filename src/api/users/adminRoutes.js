import express from 'express';
import { login,verifyOTP } from '../../controllers/login';
import { auth } from '../../middleware/auth';
import {
  getAllUsers,
  createAdmin,
  deleteUsers,
  getSingleUser,
} from '../../controllers/users/adminFunctions';
import { disableUser, enableUser } from '../../controllers/Auth/user_status';

const router = express.Router();

router.post('/api/admin/login', login);
router.post('/api/vendor/verify', verifyOTP);
router.get('/api/admin/users', auth('admin'), getAllUsers);
router.get('/api/admin/users/:id', auth('admin'), getSingleUser);
router.post('/api/admin/users', createAdmin);
router.delete('/api/admin/users/:id', auth('admin'), deleteUsers);
router.put('/api/v1/users/:id/disable', auth('admin'), disableUser)
router.put('/api/v1/users/:id/enable', auth('admin'), enableUser)

export default router;
