import express from "express";
import {
  priceproduct,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  searchproduct,
} from "./product.controller.js";

import {
  validateProduct,
  validateProductId,
} from "../../middlewares/validateProduct.js";

const productRoutes = express.Router();

// Abdelwahab => Admin CRUD operations
productRoutes.get("/products", getAllProducts);
productRoutes.post("/addProduct", validateProduct, addProduct);
productRoutes.put(
  "/updateProduct/:Id",
  validateProductId,
  validateProduct,
  updateProduct
);
productRoutes.delete("/deleteProduct/:Id", validateProductId, deleteProduct);

// heba start from here
productRoutes.get("/products/search", searchproduct);
productRoutes.get("/products/price", priceproduct);

export default productRoutes;
/**
1- fetch songle product by id 
2- search for product by name
3- filter by price and category

*/
