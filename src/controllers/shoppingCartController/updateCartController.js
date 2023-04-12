import db from '../../database/models';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import { getCarts, CalculateTotalPrice } from '../../utils/getCartsHandler';

export const updateCart = asyncWrapper(async (req, res) => {
  const { id, quantity } = req.body;
  // console.log('Hello id',id);
  const buyerId = req.user.id;
  const cart = await getCarts(buyerId)
  if (!cart)
    return res
      .status(404)
      .json({ status: req.t('fail'), message: req.t('not_found') });
  const cartData = cart.map((item) => {
    return item.id;
  });
  const itemToUpdate = cartData.find((item) => {
    return item == id;
  });
  console.log(`====================${cartData}=============${id}==========`);
  const cartItem = await db.shoppingCarts.findByPk(itemToUpdate);
  const productVariation = await db.ProductAttribute.findByPk(
    cartItem.dataValues.product
  );
  console.log(`====================${cartItem}=============${id}==========`);

  if (productVariation.dataValues.quantity < quantity) {
    return res.status(404).json({
      status: req.t('fail'),
      message: req.t('exceeds_stock'),
    });
  }
  const totalAmount = productVariation.dataValues.price * quantity;
  const updatedCart = await cartItem.update({
    quantity,
    totalpricePerProduct: totalAmount,
  });
    const newCart = await getCarts(buyerId);
  const totalPrice = CalculateTotalPrice(newCart);
  console.log('Hello total', totalPrice);
  res.status(201).json({
    status: req.t('success'),
    message: req.t('cart_item_updated'),
    data: {carts:newCart, totalPrice},
  });
});

export const deleteCartItem = asyncWrapper(async (req, res) => {
  const { id } = req.body;
  const buyerId = req.user.id;
  const cart = await getCarts(buyerId);
  if (!cart)
    return res
      .status(404)
      .json({ status: req.t('fail'), message: req.t('not_found') });
  const cartData = cart.map((item) => {
    return item.id;
  });
  const itemToDelete = cartData.find((item) => {
    return item == id;
  });
  const cartItem = await db.shoppingCarts.findByPk(itemToDelete);
  if(!cartItem) return res.status(404).json({status:req.t('fail'), message:req.t('not_found')})
    const deletedItem = await cartItem.destroy();
    const newCart = await getCarts(buyerId);
    const totalPrice = CalculateTotalPrice(newCart);
    res.status(200).json({
    status: req.t('success'),
    message: req.t('cart_item_deleted'),
    data: {carts:newCart, totalPrice},
  });
});


