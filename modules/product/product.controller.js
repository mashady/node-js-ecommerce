import { productModel } from "../../database/models/product.model.js";

const showproduct = async (req, res) => {
  const products = await productModel.find();
  res.json({ message: "show product", products });
};
const addproduct = async (req, res) => {
  const product = await productModel.create(req.body);
  res.json({ message: "show product", product });
};

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

export { showproduct, searchproduct, priceproduct ,addproduct};
