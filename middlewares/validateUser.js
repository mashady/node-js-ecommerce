import userSchema from "../validation/userValidate.js";

export const validateUser = (req, res, next) => {
  const validation = userSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details.map((err) => err.message),
    });
  }
  next();
};
