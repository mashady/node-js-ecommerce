import Joi from "joi";

export const storeValidationSchema = Joi.object({
  businessName: Joi.string().min(3).max(100).required().messages({
    "string.base": "Business name must be a string.",
    "string.empty": "Business name cannot be empty.",
    "string.min": "Business name must be at least {#limit} characters long.",
    "string.max": "Business name cannot exceed {#limit} characters.",
    "any.required": "Business name is required.",
  }),

  storeDescription: Joi.string().max(500).allow("").messages({
    "string.base": "Store description must be a string.",
    "string.max": "Store description cannot exceed {#limit} characters.",
  }),

  storeBanner: Joi.string().uri().messages({
    "string.uri": "Store banner must be a valid URL.",
  }),

  storeLogo: Joi.string().uri().messages({
    "string.uri": "Store logo must be a valid URL.",
  }),
});
