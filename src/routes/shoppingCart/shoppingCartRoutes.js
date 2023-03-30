import express from 'express';
import { auth } from '../../middleware/auth';
import {
  addToCart,
  viewCart,
} from '../../controllers/shoppingCartController/addToCartController';
import {
  updateCart,
  deleteCartItem,
} from '../../controllers/shoppingCartController/updateCartController';
const CartRoutes = express.Router();
CartRoutes.post(
  '/api/v1/shoppingCart/add',
  auth(['vendor', 'buyer', 'admin']),
  addToCart
);
CartRoutes.get(
  '/api/v1/shoppingCart/view',
  auth(['vendor', 'buyer', 'admin']),
  viewCart
);
CartRoutes.patch(
  '/api/v1/shoppingCart/update',
  auth(['vendor', 'buyer', 'admin']),
  updateCart
);
CartRoutes.delete(
  '/api/v1/shoppingCart/delete',
  auth(['vendor', 'buyer', 'admin']),
  deleteCartItem
);

export default CartRoutes;
