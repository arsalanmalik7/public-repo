const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get featured categories
router.get('/featured', categoryController.getFeaturedCategories);

// Search categories
router.get('/search', categoryController.searchCategories);

// Get category by ID
router.get('/:id', categoryController.getCategoryById);

module.exports = router; 