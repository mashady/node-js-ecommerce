import { categorySchema } from "../validation/categoryValidate.js";
import { categoryModel } from "../database/models/category.model.js";
import mongoose from "mongoose";

export const validateCategory = (req, res, next) => {
  const validation = categorySchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details.map((err) => err.message),
    });
  }
  next();
};

export const validateCategoryId = async (req, res, next) => {
  const reqCategory = req.params.catId;

  if (!mongoose.Types.ObjectId.isValid(reqCategory)) {
    return res.status(400).json({ message: "Invalid category ID format!" });
  }

  const foundedCategoryById = await categoryModel.findById(reqCategory);

  if (!foundedCategoryById)
    return res.status(404).json({ Message: "Category does not exist." });

  next();
};

export const validateCategoryName = async (req, res, next) => {
  const { name } = req.body;

  const foundedCategoryByName = await categoryModel.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
  });

  if (foundedCategoryByName)
    return res.status(409).json({ Message: "category already exists." });

  next();
};
