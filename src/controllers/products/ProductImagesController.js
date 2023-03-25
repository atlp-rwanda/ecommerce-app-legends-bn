import db from '../../database/models';
import { checkEmptyFields } from '../../utils/validations/handlingEmptyFields';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import { grabbingImage } from '../../utils/grabbingImages';
//defining execution of images uploads

export const addNewProductimages = asyncWrapper(async (req, res) => {
  // Get the data for the new product from the request body
  const { productId, status } = req.body;

  // Check if the required fields are provided
  const areAllNotFilled = checkEmptyFields(req, res);

  if (!areAllNotFilled) {
    // Check if the category and user exist
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'product not found.' });
    }
    // Create the new product


    const urls = await grabbingImage(req);

    if (product) {
      urls.forEach(async (element) => {
        console.log(element);
        await db.ProductImage.create({
          productId,
          prodImage: element.url,
          status,
        });
      });
    }

    const productimageDetails = await db.Product.findByPk(productId, {
      include: [{ model: db.ProductImage }],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(201).json({
      status: req.t('success'),
      data: productimageDetails,
      message: `new images are uploaded successfully`,
    });
  }
});
