import express from "express";
import { validateBannerById, validateBannerByName, validateBanner } from "../../middlewares/validateBanner.js"
import { addBanner, getBanners, updateBanner, deleteBanner } from "./banner.controller.js";
import upload from "../../middlewares/multer.upload.js";


export const bannerRoutes = express.Router();

bannerRoutes.post("/addBanner", upload.array("images", 5), validateBanner, validateBannerByName, addBanner);
bannerRoutes.get("/getBanners", getBanners);
bannerRoutes.put("/updateBanner/:id", upload.array("images", 5), validateBannerById, validateBanner, validateBannerByName, updateBanner);
bannerRoutes.delete("/deleteBanner/:id", validateBannerById, deleteBanner);