import Joi from "joi";

const userSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
  }),

  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"))
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter and one number",
    }),

  phoneNumber: Joi.string()
    .pattern(new RegExp("^[0-9]{10,15}$"))
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10-15 digits",
    }),
  address: Joi.string().optional().max(255).messages({
    "string.max": "Address should be no longer than 255 characters",
  }),
  role: Joi.string().valid("user", "seller").required(), // we just update this for handle multi roles [ user / seller ]

  isVerified: Joi.boolean().default(false),
  subscribed: Joi.boolean().default(false),
  provider: Joi.string().default("email"),
});

export default userSchema;
