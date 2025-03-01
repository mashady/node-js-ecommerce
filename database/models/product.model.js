import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 30
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0.01, // Enforce a minimum positive price
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to the Category model 
      required: true
    },
    images: [{
      type: String,
      trim: true,
    }],
    stock: {
      type: Number,
      required: true,
      min: 0, // Enforce non-negative stock
    },
    reviews: [{ 
      type: mongoose.Schema.Types.ObjectId, // Reference the Review model 
      ref: 'Review'
    }]
  },
  { timestamps: true, versionKey: false }
);
export const productModel = mongoose.model("Product", productSchema);
