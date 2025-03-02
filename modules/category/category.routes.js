import express from "express";
import { validateCategory, validateCategoryId, validateCategoryName } from "../../middlewares/validateCategory.js";
import { addCategory, deleteCategory, getCategories, updateCategory } from "./category.controller.js";

export const categoryRoutes = express.Router();

categoryRoutes.post("/addCategory", validateCategory, validateCategoryName, addCategory);
categoryRoutes.get("/getCategories", getCategories);
categoryRoutes.put("/updateCategory/:catId", validateCategoryId, validateCategory, validateCategoryName, updateCategory);
categoryRoutes.delete("/deleteCategory/:catId", validateCategoryId, deleteCategory);