import Express  from "express"
import { auth } from '../../middleware/auth';
import {createVendor} from "../../controllers/users/vendorFunctions" 

const router =Express.Router()


//routes for vendors
router.post('/api/vendor/users', auth('admin'), createVendor);


export default router