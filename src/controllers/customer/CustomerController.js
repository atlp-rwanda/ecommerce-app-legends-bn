import db from '../../database/models';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';

const getMyCustomers = asyncWrapper(async (req, res) => {
    const vendorId = req.user.id;
    // const vendorId = '333d358e-0ced-4ce5-af42-67af086616bd';
    const OrderDetails = await db.Order3Details.findAll({
      include: [
        {
          model: db.Order,
          include: [
            {
              model: db.user,
            },
          ],
        },
        {
              model: db.ProductAttribute,
              include: [
                {
                  model: db.Product,
                  where: {
                    userId: vendorId,
                  },
                  required: true
                },
              ],
              required: true
            },
      ],
    });
    res.status(200).json({
        status: 'success',
        data:OrderDetails
    })
  });
  export default getMyCustomers;
