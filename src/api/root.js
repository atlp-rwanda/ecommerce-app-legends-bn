import express from 'express';
import { createUser,root} from '../controllers/userController';
const router = express.Router();

router.get('/',root);
router.post('/new-user', createUser);

export default router;
