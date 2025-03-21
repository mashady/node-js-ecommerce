import Joi from "joi";
export const orderSchema = Joi.object({
  cart: Joi.string()
    .required()
    .messages({
      "string.empty": "Cart ID is required",
    }),

  shippingAddress: Joi.object({
    fullName: Joi.string().trim().min(2).max(100).required().messages({
      "string.empty": "Full name is required",
      "string.min": "Full name must be at least 2 characters",
      "string.max": "Full name must be at most 100 characters",
    }),

    address: Joi.string().trim().min(5).max(255).messages({
      "string.empty": "Address is required",
      "string.min": "Address must be at least 5 characters",
      "string.max": "Address must be at most 255 characters",
    }),

    city: Joi.string().trim().min(2).max(100).required().messages({
      "string.empty": "City is required",
      "string.min": "City must be at least 2 characters",
      "string.max": "City must be at most 100 characters",
    }),

    postalCode: Joi.string().trim().min(3).max(12).required().messages({
      "string.empty": "Postal code is required",
      "string.alphanum": "Postal code must be alphanumeric",
      "string.min": "Postal code must be at least 3 characters",
      "string.max": "Postal code must be at most 12 characters",
    }),

    country: Joi.string().trim().min(2).max(100).required().messages({
      "string.empty": "Country is required",
      "string.min": "Country must be at least 2 characters",
      "string.max": "Country must be at most 100 characters",
    }),
  }).required(),

  paidAt: Joi.date().iso().optional().messages({
    "date.base": "PaidAt must be a valid date",
    "date.format": "PaidAt must be in ISO format (YYYY-MM-DD)",
  }),
});
