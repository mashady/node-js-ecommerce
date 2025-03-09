import { storeValidationSchema } from "../validation/storeValidate.js";
export const validateStore = (req, res, next) => {
  const { error } = storeValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};
