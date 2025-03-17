import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/orderModel.js";
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "backend/config/config.env" });
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create stripe checkout session => /api/v1/payment/checkout_session
export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req?.body;

    const line_items = body?.orderItems?.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item?.name,
            images: [item?.image],
            metadata: { productId: item?.productId },
          },
          unit_amount: item?.price,
        },
        tax_rates: ["txr_1OjrXSKHdWLBgmO5Q2ryTlNY"],
        quantity: item?.amount,
      };
    });

    const shippingInfo = body?.shippingInfo;

    const shipping_rate =
      body?.itemsPrice >= 200
        ? "shr_1Ojk9PKHdWLBgmO5fVnAwPZP"
        : "shr_1OjkAOKHdWLBgmO51nJdTQuD";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.FRONTEND_URL}/me/orders?order_success=true`,
      cancel_url: `${process.env.FRONTEND_URL}`,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?._id?.toString(),
      mode: "payment",
      metadata: {
        ...shippingInfo,
        itemsPrice: body?.itemsPrice,
      },
      shipping_options: [
        {
          shipping_rate: shipping_rate,
        },
      ],
      line_items: line_items,
    });
    res.status(200).json({
      url: session.url,
    });
  },
);

const getOrderItems = async (line_items) => {
  return new Promise((resolve, reject) => {
    let cartItems = [];
    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        productId: productId,
        name: product.name,
        price: item.price.unit_amount_decimal,
        amount: item.quantity,
        image: product.images[0],
      });
      if (cartItems.length === line_items?.data?.length) {
        resolve(cartItems);
      }
    });
  });
};

// Create new order after payment is successful => /api/v1/payment/webhook
export const stripeWebhook = catchAsyncErrors(async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log(session);

      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id,
      );

      const orderItems = await getOrderItems(line_items);
      const user = session.client_reference_id;
      const totalAmount = session.amount_total;
      const taxAmount = session.total_details.amount_tax;
      const shippingAmount = session.total_details.amount_shipping;
      const itemsPrice = session.metadata.itemsPrice;
      const shippingInfo = {
        fullName: session.metadata.fullName,
        city: session.metadata.city,
        address1: session.metadata.address1,
        address2: session.metadata.address2,
        country: session.metadata.country,
        countryName: session.metadata.countryName,
        phoneNumber: session.metadata.phoneNumber,
        //zipCode: session.metadata.zipCode
      };

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const orderData = {
        shippingInfo: shippingInfo,
        orderItems: orderItems,
        itemsPrice: itemsPrice,
        taxAmount: taxAmount,
        shippingAmount: shippingAmount,
        totalAmount: totalAmount,
        paymentInfo: paymentInfo,
        paymentMethod: "credit",
        user: user,
      };

      await Order.create(orderData);

      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log(err);
  }
});
