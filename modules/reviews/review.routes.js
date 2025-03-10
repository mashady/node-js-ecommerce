import express from "express";
import { validateReview } from "../../middlewares/validateReview.js";
import auth from "../../middlewares/auth.js";
import {
  createReview,
  updateReview,
  deleteReview,
} from "./review.controller.js";
const reviewRoutes = express.Router();

// no get req need for review - will be handle with the user and product requests
// wanna to check if the user who create the review who can update or delete it only
//=> how this point handled => we have not any get request for the review
// so the only way to access any review is to see it in your profile so in this case
// you are the creator of this review so you can update or delete it
reviewRoutes.put("/review/:id", auth, validateReview, updateReview);
reviewRoutes.post("/review", auth, validateReview, createReview);
reviewRoutes.delete("/review/:id", auth, deleteReview);

export default reviewRoutes;
