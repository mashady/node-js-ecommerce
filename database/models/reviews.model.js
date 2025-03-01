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
      mix: 0,
      max: 5,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true, versionKey: false }
);

export const reviewModel = mongoose.model("Review", reviewSchema);
