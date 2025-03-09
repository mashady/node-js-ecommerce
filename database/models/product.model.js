import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.0,
    },
    discount: {
      type: Number,
      min: 0.0,
      max: 1.0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true, versionKey: false }
);
export const productModel = mongoose.model("Product", productSchema);
