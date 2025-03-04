import express from "express";
import { validateReview } from "../../middlewares/validateReview.js";

import {
  createReview,
  updateReview,
  deleteReview,
} from "./review.controller.js";
const reviewRoutes = express.Router();

reviewRoutes.put("/review", validateReview, updateReview);
reviewRoutes.post("/review", validateReview, createReview);
reviewRoutes.delete("/review", deleteReview);

export default reviewRoutes;
