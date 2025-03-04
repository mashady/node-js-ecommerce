import Joi from "joi";
const addWishlistSchema = Joi.object({
  productId: Joi.string().required().messages({
    "string.base": "Product ID must be a string",
    "string.empty": "Product ID is required",
    "any.required": "Product ID is required",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});
const removeWishlistSchema = Joi.object({
  productId: Joi.string().required().messages({
    "string.base": "Product ID must be a string",
    "string.empty": "Product ID is required",
    "any.required": "Product ID is required",
  }),
});
export { addWishlistSchema, removeWishlistSchema };
