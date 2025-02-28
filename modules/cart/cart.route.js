import express from "express";
import { addCart, getCarts } from "./cart.controller.js"
export const cartRoute = express.Router()
// testing cart schema
cartRoute.get("/cart", getCarts)
cartRoute.post("/cart", addCart)