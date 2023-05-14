import db from '../../database/models';
import { Op } from 'sequelize';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import { checkEmptyFields } from '../../utils/validations/handlingEmptyFields';
export const getWishlist = asyncWrapper(async (req, res) => {
  const wishlist = await db.wishlist.findOne({
    where: { userId: req.user.id },
  });
  const { productId } = wishlist;
  if (productId === null) {
    return res
      .status(404)
      .json({ status: req.t('success'), message: req.t('no_wishlist') });
  }
  const products = await db.Product.findAll({
    where: { id: { [Op.in]: productId } },
    include: [{ model: db.Category }],
  });
  res.status(200).json({ status: req.t('success'), data:products });
});

export const addToWishlist = asyncWrapper(async (req, res) => {
  const product = req.body.productId;
  const emptyFields = checkEmptyFields(req.body);
  if (!emptyFields) {
    const activewishlist = await db.wishlist.findOne({
      where: {
        userId: req.user.id,
      },
    });

    //in case they dont have a wish list
    if (!activewishlist) {
     const data = await db.wishlist.create({
        userId: req.user.id,
        productId: [product],
      });
      const productData = await db.Product.findOne({where : {id : data.productId}})
      res
        .status(201)
        .json({ status: req.t('success'), message: productData.name + ' ' + req.t('added_to_wishlist'), data:productData });
    } else {
      //updating the wishlist when its there
      if (activewishlist.productId.includes(product)) {
        const productData = await db.Product.findOne({where : {id : activewishlist.productId}})
        return res.status(400).json({
          status: req.t('fail'),
          message: productData.name + ' ' + req.t('exists_in_wishlist'),
        });
      } else {
        const updatedWishlist = [...activewishlist.productId, product];
       const data = await activewishlist.update({
          productId: updatedWishlist,
        });
        const productData = await db.Product.findOne({where : {id : data.productId}})
        res.status(201).json({
          status: req.t('success'),
          message: productData.name + ' ' + req.t('added_to_wishlist'),
          data: productData
        });
      }
    }
  }
});
export const deleteFromWishlist = asyncWrapper(async (req, res) => {
  const product = req.params.product;
  const activewishlist = await db.wishlist.findOne({
    where: {
      userId: req.user.id,
    },
  });
  const newwishlist = [...activewishlist.productId];
  if (newwishlist.includes(product)) {
    newwishlist.filter((element, index) => {
      if (element === product) {
        newwishlist.splice(index, 1);
      }
    });

    await activewishlist.update({
      productId: newwishlist,
    });
    res
      .status(200)
      .json({
        status: req.t('success'),
        message: req.t('removed_from_wishlist'),
      });
  } else {
    return res.status(400).json({
      status: req.t('fail'),
      message: req.t('not_exists_in_wishlist'),
    });
  }
});
