import express from "express";
import { validateBannerById, validateBannerByName, validateBanner } from "../../middlewares/validateBanner.js"
import { addBanner, getBanners, updateBanner, deleteBanner } from "./banner.controller.js";


export const bannerRoutes = express.Router();

bannerRoutes.post("/addBanner", validateBanner, validateBannerByName, addBanner);
bannerRoutes.get("/getBanners", getBanners);
bannerRoutes.put("/updateBanner/:id", validateBannerById, validateBanner, validateBannerByName, updateBanner);
bannerRoutes.delete("/deleteBanner/:id", validateBannerById, deleteBanner);