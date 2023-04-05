import db from '../../database/models';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import { checkEmptyFields } from '../../utils/validations/handlingEmptyFields';
import generateCouponCode from '../../utils/generateRandomString';

const create = asyncWrapper(async (req, res) => {
  checkEmptyFields(req, res);
  const productAttributeIds = req.body.productAttributes;

  let data;

  const vendorId = req.user.id;

  data = await db.Coupon.create({
    ...req.body,
    vendorId,
    code: generateCouponCode(8),
  });

  if (data) {
    // check if the product attribute id exists
    for (let element of productAttributeIds) {
      let productAttributes = await db.ProductAttribute.findByPk(element);

      if (!productAttributes)
        return res.status(404).json({
          status: req.t('fail'),
          message: req.t('related_product_attributte_not_found', { element }),
        });
    }

    // check if the coupon expiration date is valid it should be next to 1 day form the time of creation
    const givenDate = new Date(req.body.expire_at);
    let currentDate = new Date();
    
    const nextDay = new Date(currentDate.setDate(currentDate.getDate() + 1));

    if (givenDate < nextDay || givenDate < currentDate) {
      return res.status(400).json({
        status: req.t('fail'),
        message: req.t('coupon_expiration_error'),
      });
    }
  }

  for (let element of productAttributeIds) {
    await db.CouponProduct.create({
      couponId: data.id,
      prodcutAttributeId: element,
    });
  }

  const coupons = await db.Coupon.findByPk(data.id, {
    include: [
      {
        model: db.CouponProduct,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
  });
  return res.status(201).json({
    status: req.t('success'),
    message: req.t('coupon_code_created'),
    data: coupons,
  });
});

const index = asyncWrapper(async (req, res) => {
  const vendorId = req.user.id;
  const data = await db.Coupon.findAll({
    include: [
      {
        model: db.CouponProduct,
        include: [
          {
            model: db.ProductAttribute,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
    where: {
      vendorId,
    },
  });

  return res.status(200).json({ status: req.t('success'), data });
});

const applyCoupon = asyncWrapper(async (req, res) => {
  const buyer = req.user.id;
  const couponCode = req.body?.couponCode;

  if (!couponCode)
    return res
      .status(400)
      .json({ status: req.t('fail'), message: req.t('coupon_code_required') });

  const coupon = await db.Coupon.findOne({
    where: { code: couponCode },
    include: [
      {
        model: db.CouponProduct,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
  });

  if (!coupon) {
    return res
      .status(404)
      .json({ status: req.t('fail'), message: req.t('coupon_not_exist') });
  }

  // check if the coupon expiration date is valid it should be next to 1 day form the time of creation
  const expireAt = new Date(coupon.expire_at);
  let currentDate = new Date().toUTCString();

  if (expireAt < currentDate) {
    return res.status(400).json({
      status: req.t('fail'),
      message: req.t('coupon_expiration_error'),
    });
  }

  if (coupon.max_usage <= coupon.usage) {
    return res.status(400).json({
      status: req.t('fail'),
      message: req.t('coupon_maximum_usage_error'),
    });
  }

  const cart = await db.shoppingCarts.findAll({ where: { buyer } });

  let discountedCart = cart
    .map((item) => item.toJSON())
    .map((element, elementIndex, arr) => {
      let productAttId = coupon.CouponProducts.filter(
        (product) => product.id === element.product
      );
      if (productAttId) {
        return {
          ...element,
          totalpriceDiscounted:
            element.totalpricePerProduct -
            (element.totalpricePerProduct * coupon.discount_rate) / 100,
        };
      } else {
        return {
          ...element,
          totalpriceDiscounted: element.totalpricePerProduct,
        };
      }
    });
  const discountedTotal = discountedCart.reduce(
    (acc, current) => acc + current.totalpriceDiscounted,
    0
  );
  await db.shoppingCarts.update(
    { totalpricePerProduct: `${Math.floor(discountedTotal)}` },
    { where: { buyer } }
  );

  return res.status(200).json({
    status: req.t('success'),
    data: { discountedCart, discountedTotal },
    message: req.t('new_discounted_cart'),
  });
});

export default { create, index, applyCoupon };
