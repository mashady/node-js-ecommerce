import reviewValidationSchema from "../validation/reviewValidation.js";

export const validateReview = (req, res, next) => {
  const validation = reviewValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details.map((err) => err.message),
    });
  }
  next();
};
