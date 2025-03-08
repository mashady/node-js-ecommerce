import express from "express";
import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from "./wishlist.controller.js";
import {
  validateAddToWishlist,
  validateRemoveFromWishlist,
} from "../../middlewares/validateWishlist.js";
import auth from "../../middlewares/auth.js";
const wishlistRoutes = express.Router();

wishlistRoutes.get("/wishlist", auth, getWishlist);
wishlistRoutes.post("/wishlist", validateAddToWishlist, auth, addWishlist);
wishlistRoutes.delete(
  "/wishlist",
  validateRemoveFromWishlist,
  auth,
  removeWishlist
);
export default wishlistRoutes;
