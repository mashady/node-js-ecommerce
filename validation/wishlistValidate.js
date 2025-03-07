import Joi from "joi";
const addWishlistSchema = Joi.object({
  productId: Joi.string().required().messages({
    "string.base": "Product ID must be a string",
    "string.empty": "Product ID is required",
    "any.required": "Product ID is required",
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
