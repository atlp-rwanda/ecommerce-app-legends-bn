import db from '../../database/models';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import { getMostviewed } from '../../utils/handlingMostViewed';
import { removeDuplicates } from '../../utils/handlingDuplications';

export const viewSingleProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const product = await db.Product.findByPk(id, {
    include: [
      {
        model: db.ProductImage,
        attributes: { exclude: ['createdAt', 'updatedAt', 'productId'] },
      },
      {
        model: db.ProductAttribute,
        attributes: { exclude: ['createdAt', 'updatedAt', 'productId'] },
      },
    ],
  });
  const productReviews = await db.ProductRating.findAll({
    where: { productId: id}
  });
  if (!product) {
    return res.status(404).json({
      status: req.t('fail'),
      message: req.t('product_not_found'),
    });
  }
  return res.status(200).json({
    status: req.t('success'),
    data: product,
    reviews:productReviews
  });
});
export const recommendedProducts = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const wishList = await db.wishlist.findOne({
    where: { userId: id },
    attributes: ['productId'],
  });
  if (!wishList) {
    const products = await db.Product.findAll();
    return res.status(200).json({
      status: req.t('success'),
      data: products,
    });
  }
  const { productId } = wishList.dataValues;
  const recommendations = await productId.map(async (id) => {
    const result = await db.Product.findByPk(id);
    if (!result) {
      return res.status(404).json({
        status: req.t('fail'),
        message: req.t('product_not_found'),
      });
    }
    return result;
  });
  await Promise.all(recommendations).then(async (result) => {
    const category = result.map((item) => item.categoryId);
    if (category.length < 5) {
      const recommended = removeDuplicates(category);
      const result = await recommended.map(async (id) => {
        const recommend = await db.Product.findAll({
          where: { categoryId: id },
        });
        return recommend;
      });
      await Promise.all(result).then((result) => { 
        const finalResult = result.flat();
        return res.status(200).json({
          status: req.t('success'),
          data: finalResult,
        });
      })
    } else {
      const mostViewed = getMostviewed(category);
      const recommend = await db.Product.findAll({
        where: { categoryId: mostViewed },
      });
      return res.status(200).json({
        status: req.t('success'),
        data: recommend,
      });
    }
  });
});
