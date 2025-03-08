import Joi from "joi";

export const bannerSchema = Joi.object({
    title: Joi.string().min(10).max(100).required().messages({
        "string.base": "Title must be a string.",
        "string.empty": "Banner title can't be empty.",
        "string.min": "Banner title must be at least 10 characters long.",
        "string.max": "Banner title can't exceed 100 characters.",
        "any.required": "Title is required."
    }),
    description: Joi.string().min(10).required().messages({
        "string.base": "Description must be a string.",
        "string.empty": "Product description can't be empty.",
        "string.min": "Product description must be at least 10 characters long.",
        "any.required": "Description is required."
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
        })
});