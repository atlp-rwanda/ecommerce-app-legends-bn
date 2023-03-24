import express from 'express';
import { viewSingleProduct } from '../../controllers/products/buyerViewSingleProductController';
import { auth, isUserEnabled } from '../../middleware/auth';
const routes = express.Router();

routes.get('/:id',auth('buyer'),isUserEnabled, viewSingleProduct);

export default routes

