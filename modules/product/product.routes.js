import express from "express";
import {
  priceproduct,
  showproduct,
  searchproduct,
} from "./product.controller.js";
const productRoutes = express.Router();

productRoutes.get("/products", showproduct);
productRoutes.get("/products/search", searchproduct);
productRoutes.get("/products/price", priceproduct);

export default productRoutes;
