import express from 'express';
import categoryController from '../../controllers/products/categoryController'
import { auth } from '../../middleware/auth';

const routes = express.Router();

routes.get('/all', categoryController.index)
routes.get('/:id', categoryController.show)
routes.post('/add', auth('admin'), categoryController.store)
routes.put('update', auth('admin'), categoryController.update)
routes.delete('delete/:id', auth('admin'), categoryController.destroy)

export default routes;