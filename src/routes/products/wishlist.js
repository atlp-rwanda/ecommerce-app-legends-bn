import express from 'express';
import { auth } from '../../middleware/auth';
import {
  getWishlist,
  addToWishlist,
  deleteFromWishlist,
} from '../../controllers/products/wishlistController';
const router = express.Router();
router.post('/api/v1/product/wishlist', auth('buyer'), addToWishlist);
router.get('/api/v1/product/wishlist', auth('buyer'), getWishlist);
router.delete(
  '/api/v1/product/wishlist/:product',
  auth('buyer'),
  deleteFromWishlist
);
export default router;
