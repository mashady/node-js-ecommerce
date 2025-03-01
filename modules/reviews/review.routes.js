import express from "express";
import getReview from "./review.controller.js";
const reviewRoutes = express.Router();

reviewRoutes.get("/review", getReview);

export default reviewRoutes;
