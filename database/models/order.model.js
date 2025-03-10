import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    totalOrderPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Epay", "Cash"],
      default: "Cash",
    },
    checkoutSessionId: {
      type: String,
      default: null,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  if (!this.totalOrderPrice) {
    const cart = await mongoose.model("Cart").findById(this.cart);
    if (cart) {
      this.totalOrderPrice = cart.subtotal;
    }
  }
  next();
});

export const orderModel = mongoose.model("Order", orderSchema);
