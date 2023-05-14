import db from '../../database/models';
import { Op } from "sequelize";
import { checkEmptyFields } from '../../utils/validations/handlingEmptyFields';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import { grabbingImage } from '../../utils/grabbingImages';
import { removeImageFromCloudinary } from '../../utils/handlingFileUploads';
import emitter from '../../events/notifications';
import cron from 'node-cron';
import moment from 'moment';
import { SlugfyFunction } from '../../utils/textSlugfy'

export const CreateNewProduct = asyncWrapper(async (req, res) => {

  const { name, description, model, keyword, status, categoryId, expiryDate } = req.body;
  const userId = req.user.id;
  const areAllNotFilled = checkEmptyFields(req, res);

  if (!areAllNotFilled) {
    const category = await db.Category.findByPk(categoryId);
    const user = await db.user.findByPk(userId);
    if (!category) {
      return res.status(404).json({ message: ' product Category not found.' });
    }
    if (!user) {
      return res.status(404).json({ message: req.t('Undiscovered') });
    }
    const existingProduct = await db.Product.findOne({
      where: { slug: SlugfyFunction(name), userId },
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
      slug: SlugfyFunction(name),
      description,
      model,
      image: urls.map((url) => url.url)[0],
      keyword,
      status,
      categoryId: categoryId,
      userId: userId,
      cloudinaryId: urls.map((url) => url.id)[0],
      expiredAt: expiryDate 
    });
    emitter.emit('newProduct', product.name, user, category.name);
    res.status(201).json({
      status: req.t('success'),
      data: product,
      message: product.name + ' ' + req.t('is_added'),
    });
  }
});

// adding  deleting product functionality
export const deleteProduct = asyncWrapper(async (req, res) => {
  const productId = req.params.id;
  const product = await db.Product.findByPk(productId, {
    include: [db.ProductAttribute, db.ProductImage],
  });
  if (!product)
    return res.status(404).json({ message: req.t('product_not_found') });
  if (product.userId !== req.user.id) {
    return res.status(403).json({ message: req.t('not_allowed_ToDelete') });
  }
  await Promise.all([
    ...product.ProductAttributes.map((attr) => {
      attr.destroy();
      removeImageFromCloudinary(attr.cloudinaryId);
    }),
    ...product.ProductImages.map((img) => {
      img.destroy();
      removeImageFromCloudinary(img.cloudinaryId);
    }),
  ]);
  await product.destroy();
  await removeImageFromCloudinary(product.cloudinaryId);
  const user = await db.user.findOne({ where: { id: req.user.id } });
  emitter.emit('productRemoved', product.name, user);
  res.status(200).json({
    message: product.name + ' ' + req.t('productDeleted'),
  });
});

export const search = asyncWrapper(async (req, res) => {
  const { q } = req.query;
if (!q) {
  return res.status(400).send({ message: 'Missing search query' });
}
  const items = await Product.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } },,
        { model: { [Op.iLike]: `%${q}%` } },
      ],
    },
  });
  return res.status(200).json({status: req.t('success'),message: req.t('searching'), data: items});
});


export const updateProduct = asyncWrapper( async (req, res) => {
  if(!req.params.id){
    return res.status.json({status: 'error', message:  'Id' + req.t('is_required')});
  }
  let userId = req.user.id;
  const urls = await grabbingImage(req);

  const row = await db.Product.findByPk(req.params.id, { where : { userId : userId }});
  if(!row){
    return res.status(404).json({status: 'error', message: req.t('product_does_not_exist_in_collection')});
  }
  if(urls.length > 0){
    req.body['image'] = urls.map( url => url.url)[0],
    removeImageFromCloudinary(row.cloudinaryId);

  }
  else{
    req.body['image'] = row.image
  }
  row.set({
    ...req.body,
    slug: SlugfyFunction(req.body.name || row.name),
  })
  await row.save()
  res.status(200).json({ status: req.t('success'), message: req.t('product_updated_successfully'), data: row})
}
  );


cron.schedule('30 17 * * *', async () => {
  const today = moment().startOf('day').toISOString();
  const todayWithTimeZone = moment.tz(today, 'UTC').tz('Africa/Cairo').format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  const expiredProducts = await db.Product.findAll({
    where: {
      expiredAt: {
        [Op.lte]: todayWithTimeZone
      }
    }
  });
  console.log(`=========${todayWithTimeZone}=========`);
  for (const product of expiredProducts) {
    product.status = 'UNAVAILABLE';
    await product.save();
    const productOwnerUser = await db.user.findOne({ where: { id: product.userId } });
    emitter.emit('productExpired', product.name,productOwnerUser);
   
  }

});


export const rateProduct = asyncWrapper(async (req, res) => {
  // Validate request body
  const { productId, rating, comment } = req.body;
 
  if (!productId || !rating) {
    return res
      .status(400)
        .json({ error: 'Product ID and rating are required.' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: req.t('the_rating_must_be_1_to_5') });
  }

  if(! await db.Product.findByPk(productId)){
    return res.status(404).json({ error: request.t('fail'), message: req.t('product_not_found')});
  }

  const user = req.user;
  // Create new ProductRating object

  const productRating = await db.ProductRating.create({
    productId: productId,
    userId: user.id,
    rating: rating,
    comment: comment,
  });

      // Update product average rating
      const productRatings = await db.ProductRating.findAll({
        where: { productId: productId }
      });

      const numRatings = productRatings.length;
      const totalRating = productRatings.reduce((sum, rating) => sum + rating.rating, 0);
      const newAvgRating = totalRating / numRatings;
      await db.Product.update({ avgRating: newAvgRating }, {
        where: { id: productId }
      });

        // Send confirmation message to frontend
    return res.status(201).json({status: req.t('success'), data: productRating,  message: req.t('product_review_posted') });
  
});



  