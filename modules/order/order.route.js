import express from "express";
import auth from "../../middlewares/auth.js";
import { cancelAnOrder, createCashOrder,createEpayOrder, updateOrderStatus } from "./order.controller.js";
import { validateOrder } from "../../middlewares/validateOrder.js";
const orderRouter = express.Router();
orderRouter.post("/checkout/cash",auth, validateOrder,createCashOrder);
orderRouter.post("/checkout/epay",auth,validateOrder, createEpayOrder);
orderRouter.put("/checkout/:orderId/update",auth,updateOrderStatus);
orderRouter.delete("/checkout/:orderId/cancel",auth,cancelAnOrder)
export default orderRouter;
