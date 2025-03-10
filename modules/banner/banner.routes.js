import express from "express";
import {
  validateBannerById,
  validateBannerByName,
  validateBanner,
} from "../../middlewares/validateBanner.js";
import {
  addBanner,
  getBanners,
  updateBanner,
  deleteBanner,
  getBannerByTitle,
} from "./banner.controller.js";
import upload from "../../middlewares/multer.upload.js";
import auth from "../../middlewares/auth.js";
import role from "../../middlewares/role.js";

export const bannerRoutes = express.Router();

bannerRoutes.post(
  "/addBanner",
  auth,
  role.check("admin"),
  upload.array("images", 5),
  validateBanner,
  validateBannerByName,
  addBanner
);
bannerRoutes.get("/getBanners", auth, role.check("admin"), getBanners);
bannerRoutes.get("/getBanner", getBannerByTitle);
bannerRoutes.put(
  "/updateBanner/:id",
  auth,
  role.check("admin"),
  upload.array("images", 5),
  validateBannerById,
  validateBanner,
  validateBannerByName,
  updateBanner
);
bannerRoutes.delete(
  "/deleteBanner/:id",
  auth,
  role.check("admin"),
  validateBannerById,
  deleteBanner
);
