import {
  addWishlistSchema,
  removeWishlistSchema,
} from "../validation/wishlistValidate";

export const validateAddToWishlist = (req, res, next) => {
  const validation = addWishlistSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details.map((err) => err.message),
    });
  }
  next();
};

export const validateRemoveFromWishlist = (req, res, next) => {
  const validation = removeWishlistSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details.map((err) => err.message),
    });
  }
  next();
};
