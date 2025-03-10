import cartModel from "../../database/models/cart.model.js";
import { orderModel } from "../../database/models/order.model.js";
import mongoose from "mongoose";
import Stripe from "stripe";
import config from "config";
import { productModel } from "../../database/models/product.model.js";

const stripe = new Stripe(config.get("STRIPE_KEY"));

export const createEpayOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel.findOne({ _id: req.body.cart, userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }
    if (cart.products.length === 0) {
      return res
        .status(404)
        .json({ message: "There is no products in the cart!" });
    }
    for (const item of cart.products) {
      const product = await productModel.findById(item.productId);
      if (!product) continue;

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: ` Not enough stock for ${product.name}. Avaliable: ${product.stock}, Requested`,
        });
      }
      await productModel.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }
    const totalOrderPrice = cart.subtotal * 100;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Your Order" },
            unit_amount: totalOrderPrice,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://127.0.0.1:8088/checkout/epay/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://127.0.0.1:8088/checkout/epay/payment-failed`,
      metadata: { userId: req.user._id, cartId: cart._id.toString() },
    });
    const order = await orderModel.create({
      user: req.user._id,
      cart: req.body.cart,
      shippingAddress: req.body.shippingAddress,
      totalOrderPrice: cart.subtotal,
      status: "pending",
      paymentMethod: "Epay",
      checkoutSessionId: session.id,
    });

    await cartModel.findByIdAndDelete(req.body.cart);
    res.status(201).json({ status: "success", url: session.url, order });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return res.status(400).json({ message: "Invalid session" });
    }
    await orderModel.findOneAndUpdate(
      { checkoutSessionId: session.id },
      { status: "paid" }
    );

    res.json({ message: "Payment successful!" });
  } catch (error) {
    console.error("Payment success error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createCashOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(req.body.cart)) {
      return res.status(400).json({ message: "Invalid cart ID format!" });
    }

    const cart = await cartModel.findOne({ _id: req.body.cart, userId });

    if (!cart) {
      return res.status(404).json({ message: "cart not found!" });
    }

    if (cart.products.length === 0) {
      return res
        .status(404)
        .json({ message: "There is no products in the cart!" });
    }
    for (const item of cart.products) {
      const product = await productModel.findById(item.productId);
      if (!product) continue;

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: ` Not enough stock for ${product.name}. Avaliable: ${product.stock}, Requested`,
        });
      }
    }
    const totalOrderPrice = cart.subtotal;

    const order = await orderModel.create({
      user: userId,
      cart: req.body.cart,
      shippingAddress: req.body.shippingAddress,
      totalOrderPrice,
    });

    await cartModel.findByIdAndDelete(req.body.cart);
    res.status(201).json({ status: "success", data: order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const cancelAnOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderModel.findById(orderId);
    if (order.status === "canceled") {
      return res.status(400).json({ message: "Order is already canceled" });
    }
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      order.status === "shipped" ||
      order.status === "delivered" ||
      order.status === "paid"
    ) {
      return res
        .status(400)
        .json({
          message: "Cannot cancel a shipped or paid or delivered order",
        });
    }
    await orderModel.findByIdAndUpdate(
      orderId,
      { status: "canceled" },
      { new: true }
    );

    res.json({ message: "Order canceled successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = Number(page);
  limit = Number(limit);

  if (page < 1 || limit < 1) {
    return res
      .status(400)
      .json({ message: "Page and limit must be positive numbers." });
  }

  const orders = await orderModel
    .find()
    .populate("user", "name email")
    .populate("cart", "products")
    .skip((page - 1) * limit)
    .limit(limit);

  const totalOrders = await orderModel.countDocuments();
  const totalPages = Math.ceil(totalOrders / limit);

  res.status(200).json({
    success: true,
    currentPage: page,
    totalPages,
    totalOrders,
    orders,
  });
};

export const updateOrder = async (req, res) => {
  // todo add joi schema
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Status is required.",
    });
  }

  const validStatuses = [
    "pending",
    "paid",
    "shipped",
    "delivered",
    "cancelled",
  ];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Allowed values: ${validStatuses.join(", ")}`,
    });
  }

  const order = await orderModel.findById(id);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found.",
    });
  }

  order.status = status;
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated successfully.",
    updatedOrder: order,
  });
};
