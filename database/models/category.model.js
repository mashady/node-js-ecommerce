import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, minlength: 5, maxlength: 30 }
    },
    { timestamps: true, versionKey: false }
);

export const categoryModel = mongoose.model("Category", categorySchema);