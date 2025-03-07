import express from "express";
import { validateReview } from "../../middlewares/validateReview.js";

import {
  createReview,
  updateReview,
  deleteReview,
} from "./review.controller.js";
const reviewRoutes = express.Router();

// no get req need for review - will be handle with the user and product requests
reviewRoutes.put("/review", validateReview, updateReview);
reviewRoutes.post("/review", validateReview, createReview);
reviewRoutes.delete("/review", deleteReview);

export default reviewRoutes;
