import { productModel } from "../../database/models/product.model.js";
import mongoose from "mongoose";


const getAllProducts = async (req, res) => {
  const products = await productModel.find();

  if (products.length === 0)
    return res
      .status(200)
      .json({ Message: "We have no products at this moment" });

  res.status(200).json({ message: "All products", products });
};

const addProduct = async (req, res) => {
  try {

    const { name, description, price, category, stock, discount, reviews } = req.body;
    const files = req.files;

    const imagePaths = files?.map(file => `/uploads/${file.filename}`) || [];

    const addedProduct = await productModel.create({
      name,
      price,
      images: imagePaths,
      description,
      category,
      stock,
      discount,
      reviews
    });

    res.status(201).json({ message: "Product added successfully!", addedProduct });


  } catch {
    res.status(500).json({ error: error.message });
  }

};

const updateProduct = async (req, res) => {
  try {
    const reqProduct = req.params.Id;
    const existingProduct = await productModel.findById(reqProduct);

    let imagePaths = existingProduct.images || [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      reqProduct,
      { ...req.body, images: imagePaths },
      { new: true }
    );

    res.status(200).json({ message: "Product updated successfully.", updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const reqProduct = req.params.Id;

  const deletedProduct = await productModel.findByIdAndDelete(reqProduct);

  res
    .status(200)
    .json({ message: "Product deleted succcessfully.", deletedProduct });
};

const productSearch = async (req, res) => {
  const search = await productModel.find({
    name: { $regex: req.query.name, $options: "i" },
  });
  res.json({ message: "Search results", search });
};

const productPrice = async (req, res) => {
  let { aboveprice, belowprice } = req.query;
  let filter = {};

  if (aboveprice) filter.price = { $gte: aboveprice };
  if (belowprice) filter.price = { ...filter.price, $lte: belowprice };

  const products = await productModel.find(filter);
  res.json({ message: "Filtered products", products });
};

const categorySearch = async (req, res) => {
  try {
    const { category } = req.query;

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    console.log("Category ID received:", category);

    const searchResults = await productModel.find({
      category: new mongoose.Types.ObjectId(category),
    });

    if (searchResults.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category" });
    }

    res.json({ message: "Search results", results: searchResults });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  productSearch,
  productPrice,
  categorySearch,
};
