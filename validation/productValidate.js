import Joi from "joi";
import mongoose from "mongoose";
import { categoryModel } from "../database/models/category.model.js";
import { reviewModel } from "../database/models/reviews.model.js";

export const productSchema = Joi.object({
    name: Joi.string().min(5).max(20).required().messages({
        "string.base": "Name must be a string.",
        "string.empty": "Product name can't be empty.",
        "string.min": "Product name must be at least 5 characters long.",
        "string.max": "Product name can't exceed 30 characters.",
        "any.required": "Name is required."
    }),
    description: Joi.string().min(10).required().messages({
        "string.base": "Description must be a string.",
        "string.empty": "Product description can't be empty.",
        "string.min": "Product description must be at least 10 characters long.",
        "any.required": "Description is required."
    }),
    price: Joi.number().min(0).max(10000).required().messages({
        "number.base": "Price must be a valid number.",
        "number.min": "Price must be at least 0 as a free product.",
        "number.max": "Price can't exceed 10,000.",
        "any.required": "Price is required."
    }),
    category: Joi.string()
        .custom(async (value, helpers) => {

            if (!mongoose.Types.ObjectId.isValid(value)) return helpers.error("any.inValid");

            const category = await categoryModel.findById(value);

            if (!category) return helpers.error("any.notFound")

            return value;

        }, "Category ID validation")
        .required()
        .messages({
            "any.invalid": "Invalid category ID format.",
            "any.notFound": "Category not found.",
            "any.required": "Category ID is required."
        }),
    images: Joi.array()
        .items(Joi.string().uri())
        .min(1)
        .max(5)
        .required()
        .messages({
            "array.base": "Images must be an array.",
            "array.min": "You must provide at least 1 image.",
            "array.max": "You can't upload more than 5 images.",
            "array.includes": "Each image must be a valid URL.",
            "any.required": "Images field is required."
        }),
    stock: Joi.number().min(0).required().messages({
        "number.base": "Stock must be a valid number.",
        "number.min": "Stock must be at least 0",
        "any.required": "Stock is required."
    }),
    reviews: Joi.array()
        .items(Joi.string()
            .custom(async (value, helpers) => {

                if (!mongoose.Types.ObjectId.isValid(value)) return helpers.error("any.inValid");

                const review = await reviewModel.findById(value);

                if (!review) return helpers.error("any.notFound")

                return value;

            }, "Review ID validation")
        )
        .messages({
            "any.invalid": "Invalid review ID format.",
            "any.notFound": "Review not found.",
        })
});