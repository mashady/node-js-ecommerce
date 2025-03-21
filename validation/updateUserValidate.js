import Joi from "joi";

const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).optional().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
  }),
  lastName: Joi.string().min(3).max(30).optional().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Invalid email format",
  }),
  phoneNumber: Joi.string()
    .pattern(new RegExp("^[0-9]{10,15}$"))
    .optional()
    .messages({
      "string.pattern.base": "Phone number must be 10-15 digits",
    }),

  address: Joi.array().items(
    Joi.object({
      address: Joi.string().required().max(255).messages({
        "string.max": "Address should be no longer than 255 characters",
        "any.required": "Address is required",
        "string.empty": "Address is empty",
      }),
      city: Joi.string().required().max(100).messages({
        "string.max": "City name should be no longer than 100 characters",
        "any.required": "City is required",
        "string.empty": "City is empty",
      }),
      country: Joi.string().required().max(100).messages({
        "string.max": "Country name should be no longer than 100 characters",
        "any.required": "Country is required",
        "string.empty": "Country is empty",
      }),
      zip: Joi.string()
        .required()
        .pattern(new RegExp("^[0-9]{5,10}$"))
        .messages({
          "string.pattern.base": "Zip code should be 5-10 digits",
          "any.required": "Zip code is required",
          "string.empty": "Zip code is empty",
        }),
    })
  ),
  currentPassword: Joi.string().min(6).optional().messages({
    "string.min": "Current password must be at least 6 characters long",
  }),

  newPassword: Joi.string().min(6).optional().messages({
    "string.min": "New password must be at least 6 characters long",
  }),
}).with("currentPassword", "newPassword");
export default updateProfileSchema;
