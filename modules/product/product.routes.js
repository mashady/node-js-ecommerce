import express from "express";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  productSearch,
  categorySearch,
  productPrice,
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

/**
1- fetch single product by id
2- search for product by name
3- filter by price and category

*/

productRoutes.get("/product", productSearch);
productRoutes.get("/products/price", productPrice);
productRoutes.get("/products/category", categorySearch);

export default productRoutes;
