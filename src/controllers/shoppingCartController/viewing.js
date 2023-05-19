import Stripe from 'stripe';
import db from '../../database/models';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import { Op } from 'sequelize';

export const viewOrderDetails = asyncWrapper(async(req,res) =>{
  const trackingnumber = req.params.trackingId;
  const order = await db.Order.findOne({
    where: {
        trackingNumber : trackingnumber
    }
  })
  const details = await db.Order3Details.findAll({
    where: { id: { [Op.in]: order.products } },
  });
  res.status(200).json({
    status: req.t('success'),
    message:req.t('Order_details_has_been_retrieved_successfully'),
    data: details,

  })
})

