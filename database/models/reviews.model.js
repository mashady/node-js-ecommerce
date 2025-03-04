import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 60,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const reviewModel = mongoose.model("Review", reviewSchema);
