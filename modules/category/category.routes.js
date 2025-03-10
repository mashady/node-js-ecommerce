import express from "express";
import {
  validateCategory,
  validateCategoryId,
  validateCategoryName,
} from "../../middlewares/validateCategory.js";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
  getCategoryByName,
} from "./category.controller.js";
import auth from "../../middlewares/auth.js";
import role from "../../middlewares/role.js";

export const categoryRoutes = express.Router();

categoryRoutes.post(
  "/addCategory",
  auth,
  role.check("admin", "seller"),
  validateCategory,
  validateCategoryName,
  addCategory
);
categoryRoutes.get(
  "/getCategories",
  auth,
  role.check("admin", "seller"),
  getCategories
);
categoryRoutes.get(
  "/getCategory",
  auth,
  role.check("admin", "seller"),
  getCategoryByName
);
categoryRoutes.put(
  "/updateCategory/:catId",
  auth,
  role.check("admin", "seller"),
  validateCategoryId,
  validateCategory,
  validateCategoryName,
  updateCategory
);
categoryRoutes.delete(
  "/deleteCategory/:catId",
  auth,
  role.check("admin", "seller"),
  validateCategoryId,
  deleteCategory
);
