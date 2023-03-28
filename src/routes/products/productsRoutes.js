import express from 'express';
import upload from '../../utils/handlingFileUploads';
import { CreateNewProduct ,deleteProduct, search, updateProduct} from '../../controllers/products/productController';
import { addNewProductVariation, updateProductVariaton } from '../../controllers/products/productVariationsControllers';
import { addNewProductimages, updateNewProductimages} from '../../controllers/products/ProductImagesController';
import { auth, isUserEnabled } from '../../middleware/auth';
import { getAllSellerItems, getAllBuyerItems } from '../../controllers/products/itemController';

const ProductRouter = express.Router();

ProductRouter.post(
  '/api/v1/products/add',
  auth('vendor'),
  isUserEnabled,
  upload.array('image', 2),
  CreateNewProduct
);
//products atributes
ProductRouter.post(
  '/api/v1/product/variation/add',
  auth('vendor'),
  isUserEnabled,
  upload.array('attrImage', 1),
  addNewProductVariation
);

//product images
ProductRouter.post(
  '/api/v1/product/images/add',
  auth('vendor'),
  isUserEnabled,
  upload.array('prodImage', 8),
  addNewProductimages
);
//delete product
ProductRouter.delete('/api/v1/products/delete/:id',
  auth('vendor'),
  isUserEnabled,
  deleteProduct);

// GET /seller/items - retrieve all items in the collection of the requesting seller
ProductRouter.get(
  '/api/v1/seller/products',
  auth('vendor'),
  isUserEnabled,
  getAllSellerItems

);

// GET /buyer/items - retrieve all available items for sale
ProductRouter.get(
  '/api/v1/buyer/products', 
  getAllBuyerItems

);
ProductRouter.get('/api/v1/product', search);
export default ProductRouter;

ProductRouter.put(
  '/api/v1/products/update/:id',
  auth('vendor'),
  isUserEnabled,
  upload.array('image', 2),
  updateProduct
);

ProductRouter.put(
  '/api/v1/product/variation/update/:id',
  auth('vendor'),
  isUserEnabled,
  upload.array('attrImage', 1),
  updateProductVariaton
);

ProductRouter.put(
  '/api/v1/product/images/update/:id',
  auth('vendor'),
  isUserEnabled,
  upload.array('prodImage', 8),
  updateNewProductimages
);

