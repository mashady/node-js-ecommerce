import mongoose from "mongoose";

const catecgorySchema = mongoose.Schema(
    {
        name: { type: String, required: true, minlength: 3, maxlength: 30 }
    },
    { timestamps: true, versionKey: false }
);

export const categoryModel = mongoose.model("category", catecgorySchema);