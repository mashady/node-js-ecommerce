import mongoose from "mongoose";

const bannerSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            minlength: 10,
            maxlength: 100
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
            trim: true
        },
        images: [{
            type: String,
            trim: true,
          }],
    },
    { timestamps: true, versionKey: false }
);

export const bannerModel = mongoose.model("Banner", bannerSchema);