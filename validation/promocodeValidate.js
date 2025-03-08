import Joi from "joi";

export const promocodeSchema = Joi.object({
    name: Joi.string().min(5).max(20).required().messages({
        "string.base": "Name must be a valid string.",
        "string.empty": "Promocode name can't be empty.",
        "string.min": "Promocode name must be at least 5 characters long.",
        "string.max": "Promocode name can't exceed 30 characters.",
        "any.required": "Name is required."
    }),
    value: Joi.number().min(0).max(1).required().messages({
        "number.base": "Value must be a valid number.",
        "number.min": "Value must be at least 0 as No discount.",
        "number.max": "Value can't exceed 1 as free product.",
        "any.required": "Value is required."
    })
});