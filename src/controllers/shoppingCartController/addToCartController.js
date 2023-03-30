import db from '../../database/models';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';

//function to handle product addition to cart
export const addToCart = asyncWrapper(async (req, res) => {
  //grabbing data from request
  const { productId } = req.body;
  const buyerId = req.user.id;
  // checking if the product has been added in database also well as being available for sale
  const productVariation = await db.ProductAttribute.findByPk(productId);

  const productIdentifier = productVariation.productId;
  //check wether the function is available for sale.
  const productAvailability = await db.Product.findOne({
    where: {
      id: productIdentifier,
      status: 'AVAILABLE',
    },
  });
  if (!productAvailability)
    return res
      .status(404)
      .json({ status: req.t('fail'), message: req.t('not_available_ForSale') });
  //calculating price of quatity of product added to cart
  const productUnitPrice = productVariation.price;
  let quantity;
  let productINcart;
  //check wether the product has already been added
  const isAdded = await db.shoppingCarts.findOne({
    where: {
      product: productId,
    },
  });
  if (isAdded) {
    isAdded.quantity = isAdded.quantity + 1;
    isAdded.totalpricePerProduct = productUnitPrice * isAdded.quantity;
    productINcart = await isAdded.save();
    quantity = isAdded.quantity;
    console.log(quantity);
  } else {
    quantity = 1;
    const totalCost = productUnitPrice * quantity;
    //recodring information related to the cart.
    productINcart = await db.shoppingCarts.create({
      buyer: buyerId,
      product: productId,
      quantity,
      totalpricePerProduct: totalCost,
      cartStatus: 'active',
    });
  }
  //sending response to the the client
  if (productINcart) {
    const cart = await generateCart(buyerId);
    res.status(201).json({
      status: req.t('success'),
      message: req.t('cadded_to_cart'),
      data: cart,
    });
  }
});

const generateCart = async (buyer) => {
  const availableInCart = await db.shoppingCarts.findAll({});
  //if the product has spent more than fourteen days on the cart it will not be recorganised as active on that cart
  availableInCart.forEach((cart) => {
    const isCartActive = isAbondoned(cart.createdAt);
    if (isCartActive) {
      cartStatus.status = 'abandoned';
    }
  });
  //non active product will not be available on shopping cart
  const addedProducts = await db.shoppingCarts.findAll({
    where: {
      buyer: buyer,
      cartStatus: 'active',
    },
  });
  const cart = await Promise.all(
    addedProducts.map(async (addedProduct) => {
      const productId = addedProduct.product;
      const productVariation = await db.ProductAttribute.findByPk(productId);
      const productIdentifier = productVariation.productId;
      //check wether the products is available for sale.
      const productAvailability = await db.Product.findOne({
        where: {
          id: productIdentifier,
          status: 'AVAILABLE',
        },
      });
      const productUnitPrice = productVariation.price;
      const totalCost = productUnitPrice * addedProduct.quantity;
      const productInfo = {
        id: addedProduct.id,
        productName: productAvailability.name,
        productSize: productVariation.size,
        productColor: productVariation.color,
        productImage: productVariation.attrImage,
        quantity: addedProduct.quantity,
        totalPrice: totalCost,
      };
      return productInfo;
    })
  );
  const totalAmount = cart
    .map((ca) => ca.totalPrice)
    .reduce((a, b) => a + b, 0);
  const data = {
    cart,
    totalAmount,
  };
  return data;
};
//Retrive Cart Items

export const viewCart = asyncWrapper(async (req, res) => {
  const user = req.user.id;
  const cart = await generateCart(user);

  if (!cart) {
    res.status(404).json({
      status: req.t('fail'),
      message: req.t('cart_already_empty'),
    })
  }

  res.status(200).json({
    status: req.t('success'),
    message: req.t('cart_retrieved'),
    data: cart,
  });
});

//check whether the cart has been abondoned or not
const isAbondoned = (createdAt) => {
  const createdAtDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDiffInMs = currentDate.getTime() - createdAtDate.getTime();
  const timeDiffInDays = timeDiffInMs / (24 * 60 * 60 * 1000);
  const isCreatedInLastSevenDays = timeDiffInDays >= 14;
  return isCreatedInLastSevenDays;
};
