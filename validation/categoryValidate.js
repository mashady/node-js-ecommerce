import Joi from "joi";

export const categorySchema = Joi.object({
    name: Joi.string().min(5).max(20).required().messages({
        "string.empty": "Category name can't be empty.",
        "string.min": "Category name must be at least 5 characters long.",
        "string.max": "Category name can't exceed 30 characters."
    })
});