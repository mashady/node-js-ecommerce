import { promocodeModel } from "../../database/models/promocode.model.js";

export const addPromocode = async (req, res) => {

    const addedPromocode = await promocodeModel.insertOne(req.body);

    res.status(201).json({message: "Promocode added successfully", addedPromocode});
}


export const getPromocodes = async (req, res) => {

    const Promocodes = await promocodeModel.find();

    if (Promocodes.length === 0) return res.status(200).json({ Message: "We have no Promocodes at this moment" });

    res.status(200).json({ Message: "All Promocodes", Promocodes });
}


export const updatePromocode = async (req, res) => {

    const reqPromocode = req.params.id;

    const updatedPromocode = await promocodeModel.findByIdAndUpdate( reqPromocode, req.body );

    res.status(200).json({ message: "Promocode updated successfully", updatedPromocode });
}

export const deletePromocode = async (req, res) => {

    const reqPromocode = req.params.id;

    const deletedPromocode = await promocodeModel.findByIdAndDelete( reqPromocode );

    res.status(200).json({ message: "Promocode deleted successfully", deletedPromocode });
}
