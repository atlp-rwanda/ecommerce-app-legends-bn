import express from 'express';
import rootController from '../controllers/rootController';
import { createUser,getAllUsers} from '../controllers/rootController';
const router = express.Router();

router.get('/', rootController.root);
router.post('/new-user', createUser);

export default router;
