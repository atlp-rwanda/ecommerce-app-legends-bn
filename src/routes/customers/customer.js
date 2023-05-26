import express from 'express';
import { auth } from '../../middleware/auth';
import getMyCustomers from '../../controllers/customer/CustomerController';
const customerRouter = express.Router();
customerRouter.get('/api/v1/vendor/customers',auth('all'),getMyCustomers);
export default customerRouter;