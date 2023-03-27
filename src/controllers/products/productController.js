import { Op } from "sequelize";
import db from '../../models';
import { checkEmptyFields } from '../../utils/validations/handlingEmptyFields';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import slugify from 'slugify';
import { grabbingImage } from '../../utils/grabbingImages';
import { removeImageFromCloudinary } from '../../utils/handlingFileUploads';
import { Product } from '../../models';

import { SlugfyFunction } from '../../utils/textSlugfy'

//defining execution of images uploads
export const CreateNewProduct = asyncWrapper(async (req, res) => {
  // Get the data for the new product from the request body
  const { name, description, model, keyword, status, categoryId } = req.body;
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
    });
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
  // find the product and include its associated models
  const product = await db.Product.findByPk(productId, {
    include: [db.ProductAttribute, db.ProductImage],
  });
  if (!product)
    return res.status(404).json({ message: req.t('product_not_found') });
  if (product.userId !== req.user.id) {
    return res.status(403).json({ message: req.t('not_allowed_ToDelete') });
  }
  // delete the associated images and attributes first
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
  // then delete the product
  await product.destroy();
  await removeImageFromCloudinary(product.cloudinaryId);
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
  res.status(200).json({ status: req.t('success'), message: req.t('product_updated_successfully'), data: row})
}
  );