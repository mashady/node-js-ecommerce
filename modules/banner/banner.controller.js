import { bannerModel } from "../../database/models/banner.model.js";


export const addBanner = async (req, res) => {
    try {
        const { title, description } = req.body;
        const files = req.files;

        const imagePaths = files?.map(file => `/uploads/${file.filename}`) || [];

        const addedBanner = await bannerModel.create({
            title,
            description,
            images: imagePaths
        });

        res.status(201).json({ message: "Banner added successfully", addedBanner });
    } catch {
        res.status(500).json({ error: error.message });
    }

}


export const getBanners = async (req, res) => {

    const banners = await bannerModel.find();

    if (banners.length === 0) return res.status(200).json({ Message: "We have no banners at this moment" });

    res.status(200).json({ Message: "All banners", banners });
}


export const updateBanner = async (req, res) => {
    try {
        const reqBanner = req.params.id;

        const existingBanner = await bannerModel.findById(reqBanner);

        const { title, description } = req.body;
        let imagePaths = existingBanner.images || [];

        if (req.files && req.files.length > 0) {
            imagePaths = req.files.map(file => `/uploads/${file.filename}`);
        }

        const updatedBanner = await bannerModel.findByIdAndUpdate(
            reqBanner,
            { title, description, images: imagePaths },
            { new: true }
        );

        res.status(200).json({ message: "Banner updated successfully", updatedBanner });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBanner = async (req, res) => {

    const reqBanner = req.params.id;

    const deletedBanner = await bannerModel.findByIdAndDelete(reqBanner);

    res.status(200).json({ message: "Banner deleted successfully", deletedBanner });
}
