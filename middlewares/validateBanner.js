import { bannerModel } from "../database/models/banner.model.js";
import Joi from "joi";

export const bannerSchema = Joi.object({
    title: Joi.string().min(10).max(100).required().messages({
        "string.base": "Title must be a string.",
        "string.empty": "Banner title can't be empty.",
        "string.min": "Banner title must be at least 10 characters long.",
        "string.max": "Banner title can't exceed 100 characters.",
        "any.required": "Title is required."
    }),
    description: Joi.string().min(10).required().messages({
        "string.base": "Description must be a string.",
        "string.empty": "Product description can't be empty.",
        "string.min": "Product description must be at least 10 characters long.",
        "any.required": "Description is required."
    })
});

export const validateBanner = (req, res, next) => {
    
    const validation = bannerSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        return res.status(400).json({
            errors: validation.error.details.map((err) => err.message)
        });
    }

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Images field is required. You must upload at least 1 image." });
    }

    if (req.files.length > 5) {
        return res.status(400).json({ error: "You can't upload more than 5 images." });
    }

    next();
};


export const validateBannerById = async (req, res, next) => {

    const reqBanner = req.params.id;

    const foundedBannerById = await bannerModel.findById(reqBanner);

    if (!foundedBannerById) return res.status(404).json({ Message: "Banner does not exist." });

    next();
}

export const validateBannerByName = async (req, res, next) => {

    const { title } = req.body;

    const foundedBannerByName = await bannerModel.findOne({
        title: { $regex: new RegExp(`^${title}$`, 'i') }
    });

    if (foundedBannerByName) return res.status(409).json({ Message: "Banner already exists." });

    next();
}