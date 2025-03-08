import { bannerModel } from "../../database/models/banner.model.js";


export const addBanner = async (req, res) => {

    const addedBanner = await bannerModel.insertOne(req.body);

    res.status(201).json({message: "Banner added successfully", addedBanner});
}


export const getBanners = async (req, res) => {

    const banners = await bannerModel.find();

    if (banners.length === 0) return res.status(200).json({ Message: "We have no banners at this moment" });

    res.status(200).json({ Message: "All banners", banners });
}


export const updateBanner = async (req, res) => {

    const reqBanner = req.params.id;

    const updatedBanner = await bannerModel.findByIdAndUpdate( reqBanner, req.body );

    res.status(200).json({ message: "Banner updated successfully", updatedBanner });
}

export const deleteBanner = async (req, res) => {

    const reqBanner = req.params.id;

    const deletedBanner = await bannerModel.findByIdAndDelete( reqBanner );

    res.status(200).json({ message: "Banner deleted successfully", deletedBanner });
}
