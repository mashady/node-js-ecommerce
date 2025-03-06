import cartModel from "../../database/models/cart.model.js";
import { orderModel } from "../../database/models/order.model.js";
import mongoose from "mongoose";
import Stripe from "stripe";
import config from "config";

const stripe = new Stripe(config.get('STRIPE_KEY'));

export const createEpayOrder = async (req, res) => {

  try {
      // console.log("Request:", req.body);
      // console.log("User:", req.user); 
      const cart = await cartModel.findById(req.body.cart);
      if (!cart) {
          return res.status(404).json({ message: "Cart not found!" });
      }

      const totalOrderPrice = cart.subtotal * 100;

      const paymentIntent = await stripe.paymentIntents.create({
          amount: totalOrderPrice,
          currency: "usd",
          payment_method_types: ["card"],
          metadata: { userId: req.user._id, cartId: cart._id.toString() },
      });

      const order = await orderModel.create({
          user: req.user._id,
          cart: req.body.cart,
          shippingAddress: req.body.shippingAddress,
          totalOrderPrice: cart.subtotal,
          paymentIntentId: paymentIntent.id,
          status: "pending",
          paymentMethod:'Epay'

      });

      // console.log(paymentIntent.status);
      await cartModel.findByIdAndDelete(req.body.cart);
      res.status(201).json({ status: "success", clientSecret: paymentIntent.client_secret, order });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: error.message });
  }
};


export const updateOrderStatus=async(req,res)=>{
    try {
      const orderId= req.params.orderId;
      const status= req.body.status;

      const validStatuses = ["pending", "paid", "canceled", "shipped", "delivered"];
      if (!validStatuses.includes(status)) {
          return res.status(400).json({ message: "Invalid status value" });
      }
      const order = await orderModel.findByIdAndUpdate(
          orderId,
          { status },
          { new: true }
      );

      if (!order) {
          return res.status(404).json({ message: "Order not found" });
      }

      res.json({ message: "Order updated successfully", order });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const createCashOrder =async(req,res)=>{
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(req.body.cart)) {

      return res.status(400).json({ message: "Invalid cart ID format!" });}


      const cart = await cartModel.findById(req.body.cart);

    if (!cart) {
      return res.status(404).json({message:"cart not found!"})
    }
    const totalOrderPrice = cart.subtotal;
  
    const order = await orderModel.create({
        user: userId,
        cart:req.body.cart,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice,
      });
  
   await cartModel.findByIdAndDelete(req.params.cartId);
    res.status(201).json({ status: 'success', data: order });
    }
    
export const cancelAnOrder=async(req,res)=>{
      try {
        const orderId= req.params.orderId;  
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status:"canceled"},
            { new: true }
        );
  
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
  
        res.json({ message: "Order canceled successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
  };
