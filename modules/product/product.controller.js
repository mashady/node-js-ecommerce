import { productModel } from "../../database/models/product.model.js";

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

const searchproduct = async (req, res) => {
  const product = await productModel.filter(
    (search) => search.name === req.query.name
  );
  res.json({ message: "show product", product });
};

const priceproduct = async (req, res) => {
  let filterproduct = [];
  if (req.query.price) {
    filterproduct = await productModel.filter(
      (price) => price.price === req.query.price
    );
  }
  res.json({ message: "show product", filterproduct });
};

export { getAllProducts, addProduct, updateProduct, deleteProduct, searchproduct, priceproduct };
