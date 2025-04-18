import { wishlistModel } from "../../database/models/wishlist.model.js";
import { productModel } from "../../database/models/product.model.js";
const getWishlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await wishlistModel
      .findOne({ userID: userId })
      .populate("products.productId");

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    if (wishlist.products.length === 0) {
      return res.status(200).json({
        message: "Your wishlist is empty",
        products: [],
      });
    }
    const wishlistWithDetails = wishlist.products.map((item) => ({
      productId: item.productId,
    }));

    res.status(200).json(wishlistWithDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching wishlist", error: error.message });
  }
};

const addWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await wishlistModel.findOne({ userID: userId });

    if (!wishlist) {
      wishlist = new wishlistModel({
        userID: userId,
        products: [{ productId }],
      });
      await wishlist.save();
    } else {
      const existingProductIndex = wishlist.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingProductIndex !== -1) {
        return res.status(400).json({
          message: "Product already exist in wishlist",
        });
      } else {
        wishlist.products.push({ productId });
      }
      await wishlist.save();
    }

    res.status(200).json({ message: "Product added to wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const wishlist = await wishlistModel.findOne({ userID: userId });
    if (!wishlist) {
      return res.status(400).json({ message: "Wishlist not found" });
    }

    const index = wishlist.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (index > -1) {
      wishlist.products.splice(index, 1);
      await wishlist.save();
      res.status(200).json({ message: "Product removed from wishlist" });
    } else {
      res.status(400).json({ message: "Product not in wishlist" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error removing product from wishlist",
      error: error.message,
    });
  }
};

export { getWishlist, addWishlist, removeWishlist };
