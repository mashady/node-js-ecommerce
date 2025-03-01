import express from "express";
import { validateCategory } from "../../middlewares/validateCategory.js";
import { addCategory, deleteCategory, getCategories, updateCategory } from "./category.controller.js";

export const categoryRoutes = express.Router();

categoryRoutes.post("/addCategory", validateCategory, addCategory);
categoryRoutes.get("/getCategories", getCategories);
categoryRoutes.put("/updateCategory/:catId", validateCategory,updateCategory);
categoryRoutes.delete("/deleteCategory/:catId", deleteCategory);