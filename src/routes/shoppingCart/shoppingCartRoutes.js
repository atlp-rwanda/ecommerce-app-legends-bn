import express from 'express';
import { auth } from '../../middleware/auth';
import { addToCart, viewCart } from '../../controllers/shoppingCartController/addToCartController';
const CartRoutes = express.Router();
CartRoutes.post('/api/v1/shoppingCart/add',auth(['vendor','buyer','admin']),addToCart);
CartRoutes.get('/api/v1/shoppingCart/view',auth(['vendor','buyer','admin']),viewCart);

export default CartRoutes;