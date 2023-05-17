import Express  from "express"
import { auth } from '../../middleware/auth';
import {createVendor, getAllVendors} from "../../controllers/users/vendorControllers" 

const router =Express.Router()
router.post('/api/v1/vendors/register', auth('admin'), createVendor);
router.get('/api/v1/vendors', getAllVendors);
export default router