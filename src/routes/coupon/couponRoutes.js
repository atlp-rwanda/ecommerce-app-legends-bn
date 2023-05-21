import express from 'express';
import couponCotroller from '../../controllers/coupon/couponCotroller'
import { auth } from '../../middleware/auth';
import { isUserEnabled } from '../../middleware/auth';

const routes = express.Router();

routes.post('/add' , auth('vendor') , isUserEnabled ,couponCotroller.create)
routes.get('/all' , auth('vendor'), auth('buyer'),  auth('admin'), isUserEnabled ,couponCotroller.index)
routes.post('/apply/coupon' , auth('vendor'), auth('buyer'), auth('admin') , isUserEnabled ,couponCotroller.applyCoupon)

export default routes