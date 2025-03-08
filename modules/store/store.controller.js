import { storeModel } from "../../database/models/store.models.js";

export const displayAllStores = async (req, res) => {
  const stores = await storeModel.find().populate("products");

  if (stores.length === 0) {
    return res.status(404).json({
      success: false,
      message: "There are no stores available.",
    });
  }

  res.status(200).json({ success: true, stores });
};

export const displayStore = async (req, res) => {
  const store = await storeModel.findById(req.params.id).populate("products");
  if (!store) {
    return res
      .status(404)
      .json({ success: false, message: "Store not found." });
  }
  res.status(200).json({ success: true, store });
};

export const createStore = async (req, res) => {
  const userId = req.user._id;

  const existingStore = await storeModel.findOne({ user: userId });
  if (existingStore) {
    return res.status(400).json({
      success: false,
      message: "User already has a store.",
    });
  }

  const newStore = await storeModel.create({ ...req.body, user: userId });

  res.status(201).json({
    success: true,
    message: "Store created successfully.",
    store: newStore,
  });
};

export const updateStore = async (req, res) => {
  const updatedStore = await storeModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedStore) {
    return res
      .status(404)
      .json({ success: false, message: "Store not found." });
  }

  res.status(200).json({
    success: true,
    message: "Store updated successfully.",
    store: updatedStore,
  });
};

export const removeStore = async (req, res) => {
  const deletedStore = await storeModel.findByIdAndDelete(req.params.id);

  if (!deletedStore) {
    return res
      .status(404)
      .json({ success: false, message: "Store not found." });
  }

  res
    .status(200)
    .json({ success: true, message: "Store deleted successfully." });
};
