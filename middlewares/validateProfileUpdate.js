import updateProfileSchema from "../validation/updateUserValidate.js";

export const validateProfileUpdate = (req, res, next) => {
  const validation = updateProfileSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details.map((err) => err.message),
    });
  }
  next();
};
