import express from 'express';
import { auth } from '../../middleware/auth';
import { isUserEnabled } from '../../middleware/auth';
import {
  getRole,
  updateUserRole,
} from '../../controllers/roles/getRoleController';

const RoleRoutes = express.Router();

RoleRoutes.get('/api/v1/roles', auth(['admin']), isUserEnabled, getRole);
RoleRoutes.patch(
  '/api/v1/roles/update',
  auth(['admin']),
  isUserEnabled,
  updateUserRole
);

export default RoleRoutes;