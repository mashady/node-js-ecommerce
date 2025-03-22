import { storeModel } from "../../database/models/store.models.js";
import { productModel } from "../../database/models/product.model.js";
import { orderModel } from "../../database/models/order.model.js";
import mongoose from "mongoose";
export const displayAllStores = async (req, res) => {
  const stores = await storeModel.find();

  if (stores.length === 0) {
    return res.status(404).json({
      success: false,
      message: "There are no stores available.",
    });
  }

  res.status(200).json({ success: true, stores });
};
export const getOrdersForSellerProducts = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user ID provided" });
  }

  const sellerId = new mongoose.Types.ObjectId(req.user._id);

  try {
    const products = await productModel.find({ addedBy: sellerId });

    if (products.length === 0) {
      return res
        .status(200)
        .json({ message: "No products found for this seller" });
    }

    const productIds = products.map((product) => product._id);

    const orders = await orderModel
      .find({
        "products.productId": { $in: productIds },
      })
      .populate("products.productId")
      .exec();

    if (orders.length === 0) {
      return res
        .status(200)
        .json({ message: "No orders found for this seller's products" });
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

export const displayStore = async (req, res) => {
  try {
    const storeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid store ID format." });
    }

    const storeWithProducts = await storeModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(storeId) },
      },
      {
        $lookup: {
          from: "products",
          localField: "user",
          foreignField: "addedBy",
          as: "products",
        },
      },
    ]);

    if (storeWithProducts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Store not found." });
    }

    res.status(200).json({
      success: true,
      message: "Store fetched successfully.",
      store: storeWithProducts[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching store.",
      error: error.message,
    });
  }
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
