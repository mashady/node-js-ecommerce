import express from "express";
import auth from "../../middlewares/auth.js";
import {
  cancelAnOrder,
  createCashOrder,
  createEpayOrder,
  updateOrderStatus,
  getAllOrders,
  updateOrder,
} from "./order.controller.js";
import { validateOrder } from "../../middlewares/validateOrder.js";
const orderRouter = express.Router();
orderRouter.post("/checkout/cash", auth, validateOrder, createCashOrder);
orderRouter.post("/checkout/epay", auth, validateOrder, createEpayOrder);
orderRouter.get("/checkout/epay/payment-success", updateOrderStatus);
orderRouter.delete("/checkout/:orderId/cancel", auth, cancelAnOrder);

orderRouter.get("/orders", getAllOrders);
orderRouter.put("/orders/:id", updateOrder); // this for admins and sellers to handle order status
export default orderRouter;
