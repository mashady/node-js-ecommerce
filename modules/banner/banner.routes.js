import express from "express";
import { validateBannerById, validateBannerByName, validateBanner } from "../../middlewares/validateBanner.js"
import { addBanner, getBanners, updateBanner, deleteBanner, getBannerByTitle } from "./banner.controller.js";
import upload from "../../middlewares/multer.upload.js";
import auth from "../../middlewares/auth.js";
import role from "../../middlewares/role.js";


export const bannerRoutes = express.Router();
bannerRoutes.use(auth)
bannerRoutes.use(role.check('admin'))

bannerRoutes.post("/addBanner", upload.array("images", 5), validateBanner, validateBannerByName, addBanner);
bannerRoutes.get("/getBanners", getBanners);
bannerRoutes.get("/getBanner", getBannerByTitle);
bannerRoutes.put("/updateBanner/:id", upload.array("images", 5), validateBannerById, validateBanner, validateBannerByName, updateBanner);
bannerRoutes.delete("/deleteBanner/:id", validateBannerById, deleteBanner);