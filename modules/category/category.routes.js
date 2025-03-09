import express from "express";
import { validateCategory, validateCategoryId, validateCategoryName } from "../../middlewares/validateCategory.js";
import { addCategory, deleteCategory, getCategories, updateCategory, getCategoryByName } from "./category.controller.js";
import auth from "../../middlewares/auth.js";
import role from "../../middlewares/role.js";

export const categoryRoutes = express.Router();
categoryRoutes.use(auth);
categoryRoutes.use(role.check('admin', 'seller'));

categoryRoutes.post("/addCategory", validateCategory, validateCategoryName, addCategory);
categoryRoutes.get("/getCategories", getCategories);
categoryRoutes.get("/getCategory", getCategoryByName);
categoryRoutes.put("/updateCategory/:catId", validateCategoryId, validateCategory, validateCategoryName, updateCategory);
categoryRoutes.delete("/deleteCategory/:catId", validateCategoryId, deleteCategory);