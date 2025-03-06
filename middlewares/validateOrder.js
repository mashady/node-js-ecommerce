import { orderSchema } from "../validation/orderValidate.js";
export const validateOrder = (req, res, next) => {
  const { error } = orderSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

