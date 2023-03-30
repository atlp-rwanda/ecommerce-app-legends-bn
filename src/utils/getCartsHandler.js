import db from '../database/models';
export const getCarts = async (buyerId) => {
  const carts = await db.shoppingCarts.findAll({ where: { buyer: buyerId } });
  return carts;
};
export const CalculateTotalPrice = (cart) => {
  const totalPrice = cart
    .map((item) => {
      return item.totalpricePerProduct;
    })
    .reduce((a, b) => a + b, 0);
  return totalPrice;
};