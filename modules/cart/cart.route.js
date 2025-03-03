import express from "express";
import { addToCart, deleteFromCart } from "./cart.controller.js";
export const cartRoute = express.Router();
// testing cart schema
//cartRoute.get("/cart", getCarts);
cartRoute.post("/cart/:productID", addToCart);
cartRoute.delete("/cart/:productID", deleteFromCart);
