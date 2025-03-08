import {
    cartSchema,
  } from "../validation/cartValidate.js";
  
  export const validateCart = (req, res, next) => {
    const validation = cartSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validation.error) {
      return res.status(400).json({
        errors: validation.error.details.map((err) => err.message),
      });
    }
    next();
  };