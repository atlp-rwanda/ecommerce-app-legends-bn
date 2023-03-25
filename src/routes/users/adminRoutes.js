import express from 'express';
import { login, verifyOTP } from '../../controllers/Auth/loginControllers';
import { auth } from '../../middleware/auth';
import { isUserEnabled } from '../../middleware/auth';
import {
  getAllUsers,
  createAdmin,
  deleteUsers,
  getSingleUser,
} from '../../controllers/users/adminControllers';
import { disableUser, enableUser } from '../../controllers/Auth/user_status';

const router = express.Router();

router.post('/api/v1/users/login', login);
router.post('/api/vendor/verify', verifyOTP);
router.get('/api/admin/users', auth('admin'), isUserEnabled, getAllUsers);
router.get('/api/admin/users/:id', auth('admin'), isUserEnabled, getSingleUser);
router.post('/api/admin/users', createAdmin);
router.delete(
  '/api/admin/users/:id',
  auth('admin'),
  isUserEnabled,
  deleteUsers
);
router.put(
  '/api/v1/users/:id/disable',
  auth('admin'),
  isUserEnabled,
  disableUser
);
router.put(
  '/api/v1/users/:id/enable',
  auth('admin'),
  isUserEnabled,
  enableUser
);

export default router;
