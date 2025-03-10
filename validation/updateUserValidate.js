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

  address: Joi.string().optional().max(255).messages({
    "string.max": "Address should be no longer than 255 characters",
  }),

  currentPassword: Joi.string().min(6).optional().messages({
    "string.min": "Current password must be at least 6 characters long",
  }),

  newPassword: Joi.string().min(6).optional().messages({
    "string.min": "New password must be at least 6 characters long",
  }),
}).with("currentPassword", "newPassword");
export default updateProfileSchema;
