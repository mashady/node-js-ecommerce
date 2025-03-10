import { promocodeModel } from "../../database/models/promocode.model.js";

export const addPromocode = async (req, res) => {
  const { name, value } = req.body;
  const userID = req.user._id;

  const addedPromocode = await promocodeModel.create({
    name,
    value,
    addedBy: userID,
  });

  res
    .status(201)
    .json({ message: "Promocode added successfully", addedPromocode });
};

export const getPromocodes = async (req, res) => {
  const Promocodes = await promocodeModel.find();

  if (Promocodes.length === 0)
    return res
      .status(200)
      .json({ Message: "We have no Promocodes at this moment" });

  res.status(200).json({ Message: "All Promocodes", Promocodes });
};

export const getPromocodeByName = async (req, res) => {
  try {
    const name = req.query.name;

    if (!name)
      return res
        .status(400)
        .json({ message: "The promocode's name is required to search for" });

    const reqPromocode = await promocodeModel.find({
      name: { $regex: name, $options: "i" },
    });

    if (reqPromocode.length === 0)
      return res.status(404).json({ message: "This promocode doesn't exist" });

    res.status(200).json({
      message: "Required promocode fetched successfully",
      reqPromocode,
    });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Failed to get promocode", Error: error.message });
  }
};

export const updatePromocode = async (req, res) => {
  const reqPromocode = req.params.id;
  const userID = req.user._id;

  const updatedPromocode = await promocodeModel.findByIdAndUpdate(
    reqPromocode,
    { ...req.body, updatedBy: userID },
    { new: true }
  );

  res
    .status(200)
    .json({ message: "Promocode updated successfully", updatedPromocode });
};

export const deletePromocode = async (req, res) => {
  const reqPromocode = req.params.id;

  const deletedPromocode = await promocodeModel.findByIdAndDelete(reqPromocode);

  res
    .status(200)
    .json({ message: "Promocode deleted successfully", deletedPromocode });
};
