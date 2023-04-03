import Express  from "express"
import { auth } from '../../middleware/auth';
import {createVendor} from "../../controllers/users/vendorControllers" 

const router =Express.Router()
router.post('/api/vendor/users', auth('admin'), createVendor);
export default router