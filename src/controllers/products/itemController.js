import db from "../../models";
import { asyncWrapper } from "../../utils/handlingTryCatchBlocks";


// Get all Product of a seller
export const getAllSellerItems = asyncWrapper(async (req, res) => {

    // Set up pagination options
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;
    // Find all products registered by the user with pagination
    const products = await db.Product.findAndCountAll({
        where: {
            userId: req.user.id,
            status: 'AVAILABLE'
        },

        limit,
        offset,
    });
    // Return the paginated results
    const totalPages = Math.ceil(products.count / limit);
    const currentPage = parseInt(page);
    const itemsPerPage = parseInt(limit);
    if (products) {
        res.status(200).json({
            status: req.t('success'),
            data: {
                totalItems: products.count,
                totalPages,
                currentPage,
                itemsPerPage,
                products: products.rows,
            },
            message:req.t('productRetieved'),
        });
    } else {
        res.status(404).json({
            data: {
                totalItems: products.count,
                totalPages,
                currentPage,
                itemsPerPage,
                products: products.rows,
            },
            message:req.t('product_not_found')
        })
    }
})
    //Get all available Products for sale
    export const getAllBuyerItems = asyncWrapper(async (req, res) => {

        // Set up pagination options
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset = (page - 1) * limit;
        // Find all products registered by the user with pagination
        const products = await db.Product.findAndCountAll({

            limit,
            offset,
        });
        // Return the paginated results
        const totalPages = Math.ceil(products.count / limit);
        const currentPage = parseInt(page);
        const itemsPerPage = parseInt(limit);
        res.status(200).json({
            status: req.t('success'),
            data: {
                totalItems: products.count,
                totalPages,
                currentPage,
                itemsPerPage,
                products: products.rows,
            },
            message: req.t('productRetieved'),
        });
    })
