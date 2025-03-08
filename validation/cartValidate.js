import Joi from "joi";
export const cartSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
   promocode: Joi.string().min(5).max(20).messages({
          "string.base": "Name must be a valid string.",
          "string.empty": "Promocode name can't be empty.",
          "string.min": "Promocode name must be at least 5 characters long.",
          "string.max": "Promocode name can't exceed 30 characters.",
          "any.required": "Name is required."
      }),
});



