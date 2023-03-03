import express from 'express';
import { login } from '../../controllers/login';
import { auth, authAdmin } from '../../middleware/utils/auth';
import {
  getAllUsers,
  createAdmin,
  deleteUsers,
  getSingleUser,
} from '../../controllers/users/adminFunctions';
const router = express.Router();

router.post('/api/admin/login', login);
router.get('/api/admin/users', authAdmin, getAllUsers);
router.get('/api/admin/users/:id', authAdmin, getSingleUser);
router.post('/api/admin/users', createAdmin);
router.delete('/api/admin/users/:id', authAdmin, deleteUsers);

export default router;
