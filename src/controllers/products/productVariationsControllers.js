import db from '../.././models';
import { checkEmptyFields } from '../../utils/validations/handlingEmptyFields';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import { grabbingImage } from '../../utils/grabbingImages';
//defining execution of images uploads
export const addNewProductVariation = asyncWrapper(async (req, res) => {

  // Get the data for the new product from the request body
  const { price, sizeId, color, productId,quantity } = req.body;
  // Check if the required fields are provided
  const areAllNotFilled = checkEmptyFields(req, res);
  if (!areAllNotFilled) {
    // Check if the category and user exist
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'product not found.' });
    }

    const urls = await grabbingImage(req);
    // Create the new product
    const productVariaton = await db.ProductAttribute.create({
      price,
      size,
      color,
      productId,
      attrImage:urls.map( url => url.url)[0],
      quantity,
      cloudinaryId:urls.map( url => url.id)[0]
    });

    if (product) {
    }
    res.status(201).json({
      status: req.t('success'),
      data: productVariaton,
      message: `new product Variaton with ${productVariaton.sizeId} is added successfully`,
    });
  }
});
