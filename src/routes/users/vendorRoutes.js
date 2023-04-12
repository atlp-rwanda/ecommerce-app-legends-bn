import Express  from "express"
import { auth } from '../../middleware/auth';
import {createVendor} from "../../controllers/users/vendorControllers" 

const router =Express.Router()
router.post('/api/v1/vendors/register', auth('admin'), createVendor);
export default router