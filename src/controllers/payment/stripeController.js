import Stripe from 'stripe';
import db from '../../database/models';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';

export const payment = asyncWrapper(async (req, res) => {
  try {
    const { orderId, amount, currency } = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 300,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    // Create payment method
    const card = {
      number: '4242424242424242',
      exp_month: 12,
      exp_year: 2024,
      cvc: '123',
    };
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card,
      billing_details: {
        email: 'dusingizimanaevariste3@example.com',
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

    // Handle successful payment
    if (paymentIntentConfirmation.status === 'succeeded') {
      res
        .status(200)
        .json({ status: 'success', message: 'Payment successful' });
    } else {
      throw new Error('Payment failed');
    }
  } catch (error) {
    console.error(error);

    // Send error message back to client
    res
      .status(500)
      .json({
        status: 'error',
        message: 'An error occurred while processing payment',
      });
  }
});
