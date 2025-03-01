import { categoryModel } from "../../database/models/category.model.js";

export const addCategory = async (req, res) => {
    const { name } = req.body;

    const foundedCategory = await categoryModel.findOne({ name });

    if (foundedCategory)  return res.status(409).json({Message: "category already exists."});
    
    const addedCategory = await categoryModel.insertOne({name})
    res.status(201).json({ message: "Category added successfully.", addedCategory}); 
}

export const getCategories = async (req, res) => {
    const categories = await categoryModel.find();

    if(categories.length === 0) return res.status(200).json({ Message: "We have no categories at this moment"});

    res.status(200).json({ Message: "All categories", categories});
}

export const updateCategory = async (req, res) => {

    const reqCategory = req.params.catId;

    const foundedCategory = await categoryModel.findById(reqCategory);

    if (!foundedCategory)  return res.status(404).json({Message: "Category does not exist."});

    const updatedCategory = await categoryModel.findByIdAndUpdate(reqCategory, req.body);
    res.status(200).json({Message: "Category updated successfully", updatedCategory});
}

export const deleteCategory = async (req, res) => {

    const reqCategory = req.params.catId;
    
    const foundedCategory = await categoryModel.findById(reqCategory);

    if (!foundedCategory)  return res.status(404).json({Message: "Category does not exist."});

    const deletedCategory = await categoryModel.findByIdAndDelete(reqCategory);
    res.status(200).json({Message: "Category deleted successfully", deletedCategory});
}