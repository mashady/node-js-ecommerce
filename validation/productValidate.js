import Joi from "joi";
import mongoose from "mongoose";
import { categoryModel } from "../database/models/category.model.js";
import { reviewModel } from "../database/models/reviews.model.js";

export const productSchema = Joi.object({
    name: Joi.string().min(5).max(100).required().messages({
        "string.base": "Name must be a string.",
        "string.empty": "Product name can't be empty.",
        "string.min": "Product name must be at least 5 characters long.",
        "string.max": "Product name can't exceed 100 characters.",
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
    discount: Joi.number().min(0).max(1).messages({
        "number.base": "Discount must be a valid number.",
        "number.min": "Discount must be at least 0 as 0% discount.",
        "number.max": "Discount can't exceed 1 as 100% discount.",
    }),
    category: Joi.string()
        .required()
        .messages({
            "any.required": "Category ID is required."
        }),
    images: Joi.array()
        .items(
            Joi.alternatives()
                .try(
                    Joi.string().uri(),
                    Joi.string().pattern(/^([a-zA-Z]:)?(\\|\/)?([\w\s-]+(\\|\/)?)+\.\w+$/, "file path")
                )
                .messages({
                    "alternatives.match": "Each image must be either a valid URL or a valid file path."
                })
        )
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
        .items(Joi.string())
        .messages({
            "any.invalid": "Invalid review ID format.",
            "any.notFound": "Review not found.",
        })
});