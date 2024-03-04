import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    shippingInfo: {
      fullName: {
        type: String,
        required: true,
      },
      address1: {
        type: String,
        required: true,
      },
      address2: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: true,
      },
      countryName: {
        type: String,
        required: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: [true, "Please provide a payment method"],
      enum: {
        values: ["credit", "paypal", "cash"],
        message: "Please select creadit, paypal, or cash",
      },
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
    taxAmount: {
      type: Number,
      required: true,
    },
    shippingAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: {
        values: ["processing", "delivered", "shipped", "cancelled"],
        message: "Please select current order status",
      },
      default: "processing",
    },
    deliveredAt: Date,
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
