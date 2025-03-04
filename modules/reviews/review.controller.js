import { reviewModel } from "../../database/models/reviews.model.js";

const createReview = async (req, res) => {
  const { content, rating, productID } = req.body;
  const userID = req.user._id;
  const newReview = new reviewModel({
    content,
    rating,
    userID,
    productID,
  });
  await newReview.save();
  res.json(newReview);
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const userID = req.user._id;

  const { content, rating, productID } = req.body;
  if (id) {
    const review = await reviewModel.findByIdAndUpdate(
      id,
      {
        content,
        rating,
        userID,
        productID,
      },
      {
        new: true,
      }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } else {
    return res.status(500).json({ message: "review id is required to update" });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const review = await reviewModel.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "review deleted succefully" });
  } else {
    return res.status(500).json({ message: "review id is required to update" });
  }
};

export { createReview, updateReview, deleteReview };
