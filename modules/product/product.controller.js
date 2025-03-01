import { productmodle } from "../../database/models/product.model.js";

const showproduct = async (req, res) => {
  const products = await productmodle.find();
  res.json({ message: "show product", products });
};
const searchproduct = async (req, res) => {
  const product = await productmodle.filter(
    (search) => search.name === req.query.name
  );
  res.json({ message: "show product", product });
};

const priceproduct = async (req, res) => {
  let filterproduct = [];
  if (req.query.price) {
    filterproduct = await productmodle.filter(
      (price) => price.price === req.query.price
    );
  }
  res.json({ message: "show product", filterproduct });
};

export { showproduct, searchproduct, priceproduct };
