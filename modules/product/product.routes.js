import express from "express";
import {
  getAllProducts,
  getProductById,
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

import upload from "../../middlewares/multer.upload.js";
import auth from "../../middlewares/auth.js";
import role from "../../middlewares/role.js";

export const productRoutes = express.Router();

// Abdelwahab => Admin CRUD operations
productRoutes.get("/products", getAllProducts);
productRoutes.get("/products/:Id", auth, validateProductId, getProductById);
productRoutes.post(
  "/addProduct",
  auth,
  role.check("admin", "seller"),
  upload.array("images", 5),
  validateProduct,
  addProduct
);
productRoutes.put(
  "/updateProduct/:Id",
  upload.array("images", 5),
  auth,
  role.check("admin", "seller"),
  validateProductId,
  validateProduct,
  updateProduct
);
productRoutes.delete(
  "/deleteProduct/:Id",
  auth,
  role.check("admin", "seller"),
  validateProductId,
  deleteProduct
);

/**
1- fetch single product by id
2- search for product by name 
3- filter by price and category

*/

productRoutes.get("/product", productSearch);
productRoutes.get("/products/price", productPrice);
productRoutes.get("/products/category", categorySearch);

export default productRoutes;
