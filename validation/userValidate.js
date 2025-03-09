import Joi from "joi";

const userSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"))
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter and one number",
      "any.required": "Password is required",
    }),

  phoneNumber: Joi.string()
    .pattern(new RegExp("^[0-9]{10,15}$"))
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10-15 digits",
      "any.required": "Phone Number is required",
    }),
  address: Joi.string().required().max(255).messages({
    "string.max": "Address should be no longer than 255 characters",
    "any.required": "Address is required",
  }),
  role: Joi.string().valid("user", "seller").required().messages({
    "string.valid": "Invalid role",
    "any.required": "Role is required",
  }), // we just update this for handle multi roles [ user / seller ]

  isVerified: Joi.boolean().default(false),
  provider: Joi.string().default("email"),
});

export default userSchema;
