import express from 'express';
import {
  getOrderStatus,
  updateOrderStatus,
} from '../../controllers/order/orderStatusController';
import { auth } from '../../middleware/auth';


const orderRoutes = express.Router();
orderRoutes.get('/api/v1/orders',auth('buyer'), getOrderStatus);
orderRoutes.put('/api/v1/orders/:id', auth('vendor'), updateOrderStatus);
export default orderRoutes;
