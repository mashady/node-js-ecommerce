import { productSchema } from "../validation/productValidate.js";
import mongoose from "mongoose";
import { categoryModel } from "../database/models/category.model.js";
import { reviewModel } from "../database/models/reviews.model.js";
import { productModel } from "../database/models/product.model.js";

export const validateProduct = async (req, res, next) => {
    try {
        const { category, reviews } = req.body;

        if (req.files && req.files.length > 0) {
            req.body.images = req.files.map(file => `/uploads/${file.filename}`);
        } else {
            req.body.images = [];
        }

        if (category && !mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ error: "Invalid category ID format." });
        }

        const categoryExists = await categoryModel.findById(category);
        if (category && !categoryExists) {
            return res.status(404).json({ error: "Category not found." });
        }

        if (reviews && reviews.length > 0) {
            for (let reviewId of reviews) {
                if (!mongoose.Types.ObjectId.isValid(reviewId)) {
                    return res.status(400).json({ error: `Invalid review ID format: ${reviewId}` });
                }
                const reviewExists = await reviewModel.findById(reviewId);
                if (!reviewExists) {
                    return res.status(404).json({ error: `Review not found: ${reviewId}` });
                }
            }
        }

        await productSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        return res.status(400).json({ error: error.details ? error.details.map((err) => err.message) : error.message });
    }
};

export const validateProductId = async (req, res, next) => {

    const reqProduct = req.params.Id;

    const foundedProductById = await productModel.findById(reqProduct);

    if (!foundedProductById) return res.status(404).json({ Message: "Product does not exist." });

    next();
}
