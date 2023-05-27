import express from 'express';
import {
  getOrderStatus,
  updateOrderStatus,
  adminGetOrderStatus
} from '../../controllers/order/orderStatusController';
import { auth } from '../../middleware/auth';


const orderRoutes = express.Router();
orderRoutes.get('/api/v1/orders',auth('buyer'), getOrderStatus);
orderRoutes.get('/api/v1/admin/orders',auth(['admin','vendor']), adminGetOrderStatus);
orderRoutes.put('/api/v1/orders/:id', auth('vendor'), auth('admin'), updateOrderStatus);
export default orderRoutes;
