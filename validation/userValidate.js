import Joi from "joi";

const userSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "First name cannot be empty",
    "string.min": "First name must be at least 3 characters long",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Last name cannot be empty",
    "string.min": "Last name must be at least 3 characters long",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
    "string.empty": "Email is empty",
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
      "string.empty": "Password is empty",
    }),

  phoneNumber: Joi.string()
    .pattern(new RegExp("^[0-9]{10,15}$"))
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10-15 digits",
      "any.required": "Phone Number is required",
      "string.empty": "PhoneNumber is empty",
    }),
  address: Joi.array()
    .items(
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
    )
    .min(1)
    .messages({
      "array.min": "At least one address is required",
    }),
  role: Joi.string().valid("user", "seller").required().messages({
    "string.valid": "Invalid role",
    "any.required": "Role is required",
    "string.empty": "Role is empty",
  }), // we just update this for handle multi roles [ user / seller ]

  isVerified: Joi.boolean().default(false),
  provider: Joi.string().default("email"),
});

export default userSchema;
