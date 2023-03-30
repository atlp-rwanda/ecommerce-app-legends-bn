import db from '../../database/models';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';

export const clearCart = asyncWrapper(async (req, res) => {
    const buyerId = req.user.id;
    const cartItems =  await db.shoppingCarts.destroy({
        where: {
          buyer: buyerId,
          cartStatus: 'active'
        }
      });

      const totalPrice =  await db.shoppingCarts.findAll({
        where: {
          buyer: buyerId
        }
      });
    
      if (cartItems === 0) {
        return res.status(200).json({
          status: req.t('success'),
          message: req.t('cart_already_empty')
        });
      }

    return res.status(200).json({
    status: req.t('success'),
    message: req.t('cart_cleared'),
    data: req.t('total_price', { totalAmount: totalPrice.length }),
  });
  });
