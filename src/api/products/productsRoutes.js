import express from 'express';
import upload from '../../utils/handlingFileUploads';
import { CreateNewProduct ,deleteProduct} from '../../controllers/products/productController';
import { addNewProductVariation } from '../../controllers/products/productVariationsControllers';
import { addNewProductimages } from '../../controllers/products/ProductImagesController';
import { auth } from '../../middleware/auth';

const ProductRouter = express.Router();

ProductRouter.post(
  '/api/v1/products/add',
  auth('vendor'),
  upload.array('image', 2),
  CreateNewProduct
);
//products atributes
ProductRouter.post(
  '/api/v1/product/variation/add',
  auth('vendor'),
  upload.array('attrImage', 1),
  addNewProductVariation
);

//product images
ProductRouter.post(
  '/api/v1/product/images/add',
  auth('vendor'),
  upload.array('prodImage', 8),
  addNewProductimages
);
//delete product
ProductRouter.delete('/api/v1/products/delete/:id',
auth('vendor'),deleteProduct);
export default ProductRouter;
