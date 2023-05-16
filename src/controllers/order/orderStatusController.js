import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import db from '../../database/models';

export const getOrderStatus = asyncWrapper(async (req, res) => {
  const order = await db.Order.findOne({ where: { userId: req.user.id } });
  // Send the order status to the client over a WebSocket connection
  res.status(200).json({ status: req.t('success'), order: order });
});
export const updateOrderStatus = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const order = await db.Order.update(
    { status: status },
    { where: { id: id } }
  );
  // Notify the client over a WebSocket connection that the order status has been updated
  res
    .status(201)
    .json({ status: req.t('success'), message: req.t('status_order') });
});
