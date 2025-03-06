import { productModel } from "../../database/models/product.model.js";
import mongoose from "mongoose";
const getAllProducts = async (req, res) => {

  const products = await productModel.find();

  if (products.length === 0) return res.status(200).json({ Message: "We have no products at this moment" });

  res.status(200).json({ message: "All products", products });
};

const addProduct = async (req, res) => {

  const addedProduct = await productModel.insertOne(req.body);

  res.status(201).json({ message: "Product added successfully!", addedProduct });

};

const updateProduct = async (req, res) => {
  
  const reqProduct = req.params.Id;

  const foundedProduct = await productModel.findByIdAndUpdate(reqProduct, req.body);

  res.status(200).json({message: "Product updated succcessfully.", foundedProduct});
}

const deleteProduct = async (req, res) => {

  const reqProduct = req.params.Id;

  const deletedProduct = await productModel.findByIdAndDelete(reqProduct);

  res.status(200).json({message: "Product deleted succcessfully.", deletedProduct});
}

// const searchproduct = async (req, res) => {
//   const product = await productModel.filter(
//     (search) => search.name === req.query.name
//   );
//   res.json({ message: "show product", product });
// };

// const priceproduct = async (req, res) => {
//   let filterproduct = [];
//   if (req.query.price) {
//     filterproduct = await productModel.filter(
//       (price) => price.price === req.query.price
//     );
//   }
//   res.json({ message: "show product", filterproduct });
// };

export { getAllProducts, addProduct, updateProduct, deleteProduct};

// heba

const productsearch = async (req, res) => {
  const search = await productModel.find({ name: { $regex: req.query.name, $options: 'i' } });
  res.json({ message: "Search results", search });
};

const productprice = async (req, res) => {
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

    const searchResults = await productModel.find({ category: new mongoose.Types.ObjectId(category) });

    if (searchResults.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.json({ message: "Search results", results: searchResults });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export { productsearch, productprice, categorySearch };