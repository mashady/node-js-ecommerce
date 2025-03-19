import { categoryModel } from "../../database/models/category.model.js";
import { productModel } from "../../database/models/product.model.js";

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const userID = req.user._id;

    const addedCategory = await categoryModel.create({
      name,
      addedBy: userID,
    });
    res
      .status(201)
      .json({ message: "Category added successfully.", addedCategory });
  } catch {
    console.error("Error add category:", error);
    res
      .status(500)
      .json({ Message: "Failed to add category", Error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    if (categories.length === 0)
      return res
        .status(200)
        .json({ Message: "We have no categories at this moment" });

    res.status(200).json({ Message: "All categories", categories });
  } catch {
    console.error("Error get categories:", error);
    res
      .status(500)
      .json({ Message: "Failed to get categories", Error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const id = req.params.catId;

    const existingCategory = await categoryModel.findById(id);
    
    res.status(200).json({ message: "Category fetched successfully.", existingCategory });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getCategoryByName = async (req, res) => {
  try {
    const name = req.query.name;

    if (!name)
      return res
        .status(400)
        .json({ message: "The category's name is required to search for" });

    const reqCategory = await categoryModel.find({
      name: { $regex: name, $options: "i" },
    });

    if (reqCategory.length === 0)
      return res.status(404).json({ message: "This category doesn't exist" });

    res
      .status(200)
      .json({ message: "Required category fetched successfully", reqCategory });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Failed to get category", Error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const reqCategory = req.params.catId;
    const userID = req.user._id;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      reqCategory,
      { ...req.body, updatedBy: userID },
      { new: true }
    );

    res
      .status(200)
      .json({ Message: "Category updated successfully", updatedCategory });
  } catch {
    console.error("Error updating category:", error);
    res
      .status(500)
      .json({ Message: "Failed to update category", Error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const reqCategory = req.params.catId;

    const deleteProductsResult = await productModel.deleteMany({
      category: reqCategory,
    });

    const deletedCategory = await categoryModel.findByIdAndDelete(reqCategory);

    res.status(200).json({
      Message: "Category deleted successfully",
      deletedCategory,
      productsDeleted: deleteProductsResult.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(500)
      .json({ Message: "Failed to delete category", Error: error.message });
  }
};
