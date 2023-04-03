import Stripe from 'stripe';
import db from '../../database/models';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import emitter from '../../events/notifications';


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
        id: productVariation.id,
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
    });
  }
  res.status(200).json({
    status: req.t('success'),
    message: req.t('cart_retrieved'),
    data: cart,
  });
});

export const pay = asyncWrapper(async (req, res) => {
  const user = req.user.id;
  const { cvcNumber, cardNumber, exp_month, exp_year, currency } = req.body;
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const cartItems = await cart_process(req, res);
  const totalPrice = cartItems.totalAmount;;
  console.log(totalPrice);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice,
    currency: currency,
    payment_method_types: ['card'],
  });

  const card = {
    number: cardNumber,
    exp_month: exp_month,
    exp_year: exp_year,
    cvc: cvcNumber,
  };
  console.log(card);
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card,
    billing_details: {
      email: user.email,
    },
  });

  // Update payment intent with payment method
  const paymentIntentUpdate = await stripe.paymentIntents.update(
    paymentIntent.id,
    {
      payment_method: paymentMethod.id,
    }
  );

  // Confirm payment intent
  const paymentIntentConfirmation = await stripe.paymentIntents.confirm(
    paymentIntent.id
  );
  const paymentIntentStatus = paymentIntentConfirmation.status;
  console.log(paymentIntentStatus);

  await db.Order.findOne({ where: { userId: user, status: 'pending' } }).then(
    async (order) => {
      order.status = 'paid';
      return order.save();
    }
    );
    await checkout_End(req, res, paymentIntentStatus);
});
export const checkout = asyncWrapper(async (req, res) => {
  const buyerId = req.user.id;
  const { location } = req.body;
  let ids = [];
  let order;
  const cart = await cart_process(req, res);
  const totalAmount = cart.totalAmount;
  let counter = 0;
  const dupArr = await db.Order.findOne({
    where: { userId: buyerId, status: 'pending' },
  })

  if (dupArr) {
    return res.status(200).json({
      status: req.t('fail'),
      message: req.t('checkout-already-started'),
      data: dupArr,
    });
   }


  await cart.cart.forEach(async (item) => {
    await db.OrderDetails.create({
      name: item.productName,
      quantity: item.quantity,
      size: item.productSize,
      color: item.productColor,
      price: item.totalPrice,
    }).then((data) => {
        ids.push(data.dataValues.id);
    });
    counter++;

    if (counter === cart.cart.length) {
      order = await db.Order.create({
        amount: totalAmount,
        userId: req.user.id,
        status: 'pending',
        location: location,
        products: ids,
      });
      res.status(200).json({
        status: req.t('success'),
        message: req.t('checkout-started'),
        data: order,
      });
    }
  });
});

export const checkout_End = asyncWrapper(async (req, res, data) => {
  const cart = await cart_process(req, res);
  let counter = 0;
  if (data !== 'succeeded') {
    return res.status(404).json({
      status: req.t('fail'),
      message: req.t('payment_fail'),
    });
  }
  // delete everything from the cart
  const buyerId = req.user.id;
  await db.shoppingCarts.destroy({
    where: {
      buyer: buyerId,
      cartStatus: 'active',
    },
  });
  cart.cart.forEach(async (item) => {
    db.ProductAttribute.findOne({ where: { id: item.id } }).then(
      async (product) => {
        let quantity = item.quantity;
        product.quantity = product.quantity - quantity;
        return product.save();
      }
    );
    counter++;

    if (counter === cart.cart.length) {
      let invoice = [];
      let counter2 = 0;
      const ordersList = await db.Order.findOne({
        where: {
          userId: req.user.id,
          status: 'paid',
        },
      });
      ordersList.products.forEach(async (product) => {
        const detail = await db.OrderDetails.findOne({
          attributes: [
            'name',
            'size',
            'color',
            'quantity',
            'price',
            'createdAt',
          ],
          where: {
            id: product,
          },
        });
        invoice.push(detail);
        counter2++;
        if (counter2 === ordersList.products.length) {
            db.Order.findOne({
              where: { userId: buyerId, status: 'paid' },
            }).then(async (order) => {
              order.status = 'shipping';
              return order.save();
            });
          emitter.emit('productPurchased', invoice);
          res.status(200).json({
            status: req.t('success'),
            message: req.t('payment_succeed'),
            data: invoice,
          });
        }
      });
    }
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
const cart_process = async (req, res) => {
  const user = req.user.id;
  const cart = await generateCart(user);
  if (!cart) {
    res.status(404).json({
      status: req.t('fail'),
      message: req.t('cart_already_empty'),
    });
  }
  return cart;
};
