import db from '../.././models';
import { checkEmptyFields } from '../../utils/validations/handlingEmptyFields';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import slugify from 'slugify';
import { grabbingImage } from '../../utils/grabbingImages';
//defining execution of images uploads
export const CreateNewProduct = asyncWrapper(async (req, res) => {


  // Get the data for the new product from the request body
  const { name, description, model, keyword, status, categoryId} =
    req.body;
    const userId = req.user.id;
  // Check if the required fields are provided
  const areAllNotFilled = checkEmptyFields(req, res);

  if (!areAllNotFilled) {
    // Check if the category and user exist
    const category = await db.Category.findByPk(categoryId);

    // const user = await db.user.findByPk(req.user.id);

    const user = await db.user.findByPk(userId);
    if (!category) {
      return res.status(404).json({ message: ' product Category not found.' });
    }
    if (!user) {
      return res.status(404).json({ message: 'user not found.' });
    }

    const productSlug = slugify(name, {
      remove: undefined,
      lower: true, 
      strict: false, 
      locale: 'en', 
    });

    const existingProduct = await db.Product.findOne({
      where: { slug: productSlug, userId },
    });
    //defining slug

    if (existingProduct) {
      return res
        .status(409)
        .json({ status: req.t('fail'), message: req.t('product_exist_error') });
    }

    const urls = await grabbingImage(req);
    
    // Create the new product
    const product = await db.Product.create({
      name,
      slug: productSlug,
      description,
      model,
      image: urls.map( url => url.url)[0],
      keyword,
      status,
      categoryId: categoryId,
      userId: userId,
    });
    res
      .status(201)
      .json({
        status: req.t('success'),
        data: product,
        message: `new product ${product.name} is added successfully`,
      });
  }
});
