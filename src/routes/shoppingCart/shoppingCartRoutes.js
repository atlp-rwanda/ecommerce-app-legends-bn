import express from 'express';
import { auth } from '../../middleware/auth';
import { addToCart } from '../../controllers/shoppingCartController/addToCartController';
const CartRoutes = express.Router();
CartRoutes.post('/api/v1/shoppingCart/add',auth(['vendor','buyer','admin']),addToCart);
export default CartRoutes;