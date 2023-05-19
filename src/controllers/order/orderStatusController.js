import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import db from '../../database/models';

export const getOrderStatus = asyncWrapper(async(req, res) => {
    const orderList = await db.Order.findAll({ where: { userId: req.user.id } });
    // Send the order status to the client over a WebSocket connection
    res.status(200).json({ status: req.t('success'), order: orderList });
});

export const adminGetOrderStatus = asyncWrapper(async(req, res) => {
    const orders = await db.Order.findAll();
    let allData = [];
    let counter = 0;
    await orders.forEach(async(Oneorder) => {
            let details = await db.Order2Details.findAll({
                where: {
                    orderId: Oneorder.id,
                },
            });

            let fullOrder = {
                id: Oneorder.id,
                amount: Oneorder.amount,
                status: Oneorder.status,
                location: Oneorder.location,
                userId: Oneorder.userId,
                detail: details
            }
            allData.push(fullOrder);
            counter++
            if (counter === orders.length) {
                res.status(200).json({ status: req.t('success'), order: allData });
            }
        })
        // Send the order status to the client over a WebSocket connection

});

export const updateOrderStatus = asyncWrapper(async(req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    const order = await db.Order.update({ status: status }, { where: { id: id } });
    // Notify the client over a WebSocket connection that the order status has been updated
    res
        .status(201)
        .json({ status: req.t('success'), message: req.t('status_order') });
});