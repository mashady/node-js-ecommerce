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
const wishlistRoutes = express.Router();

wishlistRoutes.get("wishlist", getWishlist);
wishlistRoutes.post("wishlist", validateAddToWishlist, addWishlist);
wishlistRoutes.delete("wishlist", validateRemoveFromWishlist, removeWishlist);
export default wishlistRoutes;
