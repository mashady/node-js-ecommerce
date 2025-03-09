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

import upload from "../../middlewares/multer.upload.js";
import auth from "../../middlewares/auth.js";
import role from "../../middlewares/role.js";

export const productRoutes = express.Router();
productRoutes.use(auth);
productRoutes.use(role.check('admin', 'seller'));

// Abdelwahab => Admin CRUD operations
productRoutes.get("/products", getAllProducts);
productRoutes.post("/addProduct", upload.array("images", 5), validateProduct, addProduct);
productRoutes.put(
  "/updateProduct/:Id",
  upload.array("images", 5),
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
