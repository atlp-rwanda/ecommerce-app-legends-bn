import db from "../../database/models";
import { asyncWrapper } from "../../utils/handlingTryCatchBlocks";


// Get all Product of a seller
export const getAllSellerItems = asyncWrapper(async (req, res) => {

    // Find all products registered by the user with pagination
    const products = await db.Product.findAndCountAll({
        where: {
            userId: req.user.id,
           // status: 'AVAILABLE'
        },
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
    
    if (products) {
        res.status(200).json({
            status: req.t('success'),
            data: {
                products: products.rows,
            },
            message:req.t('productRetieved'),
        });
    } else {
        res.status(404).json({
            data: {
                products: products.rows,
            },
            message:req.t('product_not_found')
        })
    }
})
    //Get all available Products for sale
    export const getAllBuyerItems = asyncWrapper(async (req, res) => {
        const products = await db.Product.findAndCountAll({
          where: {
            status :'AVAILABLE'
          },
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

        res.status(200).json({
            status: req.t('success'),
            data: {
                products: products.rows,
            },
            message: req.t('productRetieved'),
        });
    })
