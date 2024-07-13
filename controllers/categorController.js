const Category = require('../models/Category');
const Article = require('../models/Article'); // Ensure Article model is also imported if needed

// Create a new category
const createCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
      type: req.body.type,
      img: req.file ? req.file.path : null
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a category by ID
const updateCategoryById = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      type: req.body.type,
    };

    if (req.file) {
      updates.img = req.file.path;
    }

    const category = await Category.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a category by ID
const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category and related articles deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get categories by type
const getCategoriesByType = async (req, res) => {
    try {
      const type = req.params.type;
      const categories = await Category.find({ type: type });
      if (categories.length === 0) {
        return res.status(404).json({ error: 'No categories found for this type' });
      }
      res.status(200).json(categories);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getCategoriesByType
};
