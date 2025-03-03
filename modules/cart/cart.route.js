import express from "express";
import { addCart, addToCart, deleteFromCart, getCarts } from "./cart.controller.js"
export const cartRoute = express.Router()
// testing cart schema
cartRoute.get("/cart", getCarts)
//  cartRoute.post("/cart", addCart)
cartRoute.post("/cart/:productID", addToCart)
cartRoute.delete("/cart/:productID", deleteFromCart)