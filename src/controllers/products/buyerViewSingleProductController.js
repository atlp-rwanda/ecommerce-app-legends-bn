import db from '../../models';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';

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
  if (!product) {
    return res.status(404).json({
      status: req.t('fail'),
      message: req.t('product_not_found'),
    });
  }
  return res.status(200).json({
    status: req.t('success'),
    data: product
  });
});
