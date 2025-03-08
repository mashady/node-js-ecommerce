import express from "express";
import { addToCart, deleteFromCart, getUserCart, reduceCartItemQuantity } from "./cart.controller.js";
import auth from "../../middlewares/auth.js";
import { validateCart } from "../../middlewares/validateCart.js";
export const cartRoute = express.Router();
// testing cart schema
cartRoute.get("/cart", auth,getUserCart);
cartRoute.post("/cart/:productID",auth,validateCart, addToCart);
cartRoute.put("/cart/:productID",auth,validateCart, reduceCartItemQuantity);
cartRoute.delete("/cart/:productID",auth, deleteFromCart);
