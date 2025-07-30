const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all categories for mobile app
router.get('/', categoryController.getAllCategories);

// Get featured categories (MUST be before /:id)
router.get('/featured', categoryController.getFeaturedCategories);

// Get all categories for React Admin
router.get('/admin', async (req, res) => {
  try {
    const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
    const range = req.query.range ? JSON.parse(req.query.range) : [0, 999]; // Fetch all
    const sort = req.query.sort ? JSON.parse(req.query.sort) : ['_id', 'ASC'];
    
    // Map 'id' to '_id' for sorting
    const sortField = sort[0] === 'id' ? '_id' : sort[0];
    const sortOrder = sort[1] === 'ASC' ? 1 : -1;

    const skip = range[0];
    const limit = range[1] - range[0] + 1;
    const total = await Category.countDocuments(filter);
    const categories = await Category.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);
    res.set('Content-Range', `categories ${skip}-${skip + categories.length - 1}/${total}`);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', auth, admin, categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', auth, admin, categoryController.updateCategory);
router.delete('/:id', auth, admin, categoryController.deleteCategory);

module.exports = router; 