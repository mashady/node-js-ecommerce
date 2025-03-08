import { bannerSchema } from "../validation/bannerValidate.js";
import { bannerModel } from "../database/models/banner.model.js";

export const validateBanner = (req, res, next) => {
    const validation = bannerSchema.validate( req.body, { abortEarly: false});
    if (validation.error) {
        return res.status(400).json({
            errors: validation.error.details.map((err) => err.message)
        });
    }
    next();
}

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