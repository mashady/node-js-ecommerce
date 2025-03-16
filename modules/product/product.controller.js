import { productModel } from "../../database/models/product.model.js";
import mongoose from "mongoose";

const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 2 } = req.query; //don't forget to change the limit <==
    const skip = (page - 1) * limit;

    const products = await productModel
      .find(
        {
          _id: { $ne: req?.user?._id },
        },
        {
          name: 0,
          description: 0,
          price: 0,
          discount: 0,
          category: 0,
          addedBy: 0,
          images: 0,
          stock: 0,
          reviews: 0,
        }
      )
      .sort("-created")
      .limit(limit * 1)
      .skip(skip)
      .exec();

    if (products.length === 0)
      return res
        .status(200)
        .json({ Message: "We have no products at this moment" });

    const productsNumber = await productModel.countDocuments();
    const totalPages = Math.ceil(productsNumber / limit);

    res.status(200).json({
      message: "Products fetched successfully",
      totalProducts: productsNumber,
      totalPages: totalPages,
      page: Number(page),
      skip: Number(skip),
      data: products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const reqProduct = req.params.Id;

    const existingProduct = await productModel.findById(reqProduct);
    
    res.status(200).json({ message: "Product fetched successfully.", existingProduct });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, discount, reviews } =
      req.body;
    const files = req.files;

    const imagePaths = files?.map((file) => `/uploads/${file.filename}`) || [];
    const userID = req.user._id;
    const addedProduct = await productModel.create({
      name,
      price,
      images: imagePaths,
      description,
      addedBy: userID,
      category,
      stock,
      discount,
      reviews,
    });

    res
      .status(201)
      .json({ message: "Product added successfully!", addedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const reqProduct = req.params.Id;
    const userID = req.user._id;

    const existingProduct = await productModel.findById(reqProduct);

    let imagePaths = existingProduct.images || [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      reqProduct,
      { ...req.body, images: imagePaths, updatedBy: userID },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Product updated successfully.", updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const reqProduct = req.params.Id;

    const deletedProduct = await productModel.findByIdAndDelete(reqProduct);

    res
      .status(200)
      .json({ message: "Product deleted succcessfully.", deletedProduct });
  } catch {
    res.status(500).json({ error: error.message });
  }
};

const productSearch = async (req, res) => {
  try {
    if (!req.query.name) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const search = await productModel.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    if (search.length === 0)
      return res.status(404).json({ message: "This product doesn't exist" });

    res.json({
      message: "Search results",
      count: search.length,
      search,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const productPrice = async (req, res) => {
  try {
    let { aboveprice, belowprice } = req.query;
    let filter = {};

    if (aboveprice || belowprice) {
      filter.price = {};
      if (aboveprice) filter.price.$gte = Number(aboveprice);
      if (belowprice) filter.price.$lte = Number(belowprice);
    }

    const products = await productModel.find(filter);
    res.json({ message: "Filtered products", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  productSearch,
  productPrice,
  categorySearch,
};
