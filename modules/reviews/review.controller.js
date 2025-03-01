import { reviewModel } from "../../database/models/reviews.model.js";

const getReview = async (req, res) => {
  const { id } = req.params;
  //const review = await reviewModel.find((review) => review.id === id); => autocomplete
  const review = await reviewModel.findById(id);
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
};

export default getReview;
