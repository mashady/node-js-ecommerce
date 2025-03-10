import mongoose from "mongoose";
const storeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    businessName: { type: String, required: true },
    storeDescription: { type: String },
    storeBanner: { type: String },
    storeLogo: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export const storeModel = mongoose.model("Store", storeSchema);
