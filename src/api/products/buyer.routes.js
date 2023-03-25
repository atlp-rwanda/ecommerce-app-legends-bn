import express from 'express';
import {
  viewSingleProduct,
  recommendedProducts,
} from '../../controllers/products/buyerViewSingleProductController';
import { auth, isUserEnabled } from '../../middleware/auth';
const routes = express.Router();

routes.get('/:id', auth('buyer'), isUserEnabled, viewSingleProduct)

routes.get('/view/recommendations',auth('buyer'),recommendedProducts);

export default routes;
