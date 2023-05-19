import express from 'express';
import { auth } from '../../middleware/auth';
import { clearCart } from '../../controllers/shoppingCartController/clearCartController';
import { isUserEnabled } from '../../middleware/auth';
import { viewOrderDetails } from '../../controllers/shoppingCartController/viewing';
import {
    addToCart,
    viewCart,
    checkout,
    pay,
    checkoutCancel
} from '../../controllers/shoppingCartController/addToCartController';
import {
    updateCart,
    deleteCartItem,
} from '../../controllers/shoppingCartController/updateCartController';
const CartRoutes = express.Router();
CartRoutes.post(
    '/api/v1/shoppingCart/add',
    auth(['vendor', 'buyer', 'admin']),
    isUserEnabled,
    addToCart
);
CartRoutes.get(
    '/api/v1/shoppingCart/view',
    auth(['vendor', 'buyer', 'admin']),
    isUserEnabled,
    viewCart
);
CartRoutes.patch(
    '/api/v1/shoppingCart/update',
    auth(['vendor', 'buyer', 'admin']),
    isUserEnabled,
    updateCart
);
CartRoutes.delete(
    '/api/v1/shoppingCart/delete',
    auth(['vendor', 'buyer', 'admin']),
    isUserEnabled,
    deleteCartItem
);
CartRoutes.delete(
    '/api/v1/shoppingCart/clear',
    auth(['vendor', 'buyer', 'admin']),
    isUserEnabled,
    clearCart
);
CartRoutes.post(
    '/api/v1/checkout',
    auth(['vendor', 'buyer', 'admin']),
    isUserEnabled,
    checkout
);
CartRoutes.post(
    '/api/v1/cancelCheckout',
    auth(['vendor', 'buyer', 'admin']),
    isUserEnabled,
    checkoutCancel
);
CartRoutes.post(
    '/api/v1/checkout/payment',
    auth(['vendor', 'buyer', 'admin']),
    isUserEnabled,
    pay
);
CartRoutes.get(
    '/api/v1/orderDetails/:trackingId',
    viewOrderDetails
)

export default CartRoutes;