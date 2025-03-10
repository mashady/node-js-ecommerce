import mongoose from "mongoose";

const promocodeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 30,
    },

    value: {
      type: Number,
      required: true,
      min: 0.0,
      max: 1000,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

export const promocodeModel = mongoose.model("Promocode", promocodeSchema);
