import express from "express";
import { addToCart, deleteFromCart, getUserCart } from "./cart.controller.js";
import auth from "../../middlewares/auth.js";
export const cartRoute = express.Router();
// testing cart schema
cartRoute.get("/cart", auth,getUserCart);
cartRoute.post("/cart/:productID",auth, addToCart);
cartRoute.delete("/cart/:productID",auth, deleteFromCart);
