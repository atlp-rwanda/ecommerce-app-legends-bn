import express from 'express';
import rootController from '../controllers/rootController';

const router = express.Router();

router.get('/', rootController.root);

export default router;
