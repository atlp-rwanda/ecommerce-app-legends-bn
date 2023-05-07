import db from '../../database/models';
import { checkEmptyFields } from '../../utils/validations/handlingEmptyFields';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import { grabbingImage } from '../../utils/grabbingImages';
import { removeImageFromCloudinary } from '../../utils/handlingFileUploads';

//defining execution of images uploads
export const addNewProductVariation = asyncWrapper(async (req, res) => {

  // Get the data for the new product from the request body
  const { price, size, color, productId,quantity,varitationName } = req.body;
  // Check if the required fields are provided
  const areAllNotFilled = checkEmptyFields(req, res);
  if (!areAllNotFilled) {
    // Check if the category and user exist
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'product not found.' });
    }

    const urls = await grabbingImage(req);
    const isColorExist = await db.ProductAttribute.findOne({
      where:{
        color, productId
      }
    })
    // Create the new product
    if(!isColorExist){
    const productVariaton = await db.ProductAttribute.create({
      varitationName,
      price,
      size,
      color,
      productId,
      attrImage:urls.map( url => url.url)[0],
      quantity,
      cloudinaryId:urls.map( url => url.id)[0]
    });
    res.status(201).json({
      status: req.t('success'),
      data: productVariaton,
      message: `new product Variaton with ${productVariaton.color} is added successfully`,
    });
  } else{
    return res.status(409).json({
      status: req.t('fail'),
      message: color + ' ' + req.t('ColorbeenAddtoCart'),
    });
  }
  }
});

export const updateProductVariaton = asyncWrapper( async (req, res) => {
  const {id} = req.params
  if(!id) return res.status({ststus: req.t('fail'), message: 'Id ' + req.t('is_required') })

  const row  = await db.ProductAttribute.findByPk(id)
  if(!row) return res.status(404).json({ststus: req.t('fail'), message: req.t('no_product_variation_found')})

  const urls = await grabbingImage(req);
  if(urls.length > 0){
    req.body['attrImage'] = urls[0].url;
    removeImageFromCloudinary(row.cloudinaryId);
  }

  row.set(req.body);
  await row.save();
  return res.status(200).json({ststus: req.t('success'), message: req.t('product_variation_updated')})
})