const Category = require('../models/Category');

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get featured categories
exports.getFeaturedCategories = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const categories = await Category.find({ isActive: true })
            .sort({ createdAt: -1 })
            .limit(limit);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search categories
exports.searchCategories = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const categories = await Category.find({
            isActive: true,
            name: { $regex: query, $options: 'i' }
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, image, description, isActive } = req.body;
        const category = new Category({ name, image, description, isActive });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const { name, image, description, isActive } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, image, description, isActive },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 