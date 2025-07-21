const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const serviceController = require('../controllers/serviceController');

// Get all services (React Admin compatible)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
    const range = req.query.range ? JSON.parse(req.query.range) : [0, 9];
    const sort = req.query.sort ? JSON.parse(req.query.sort) : ['_id', 'ASC'];
    const sortField = sort[0];
    const sortOrder = sort[1] === 'ASC' ? 1 : -1;
    const skip = range[0];
    const limit = range[1] - range[0] + 1;
    const total = await Service.countDocuments(filter);
    const services = await Service.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);
    res.set('Content-Range', `services ${skip}-${skip + services.length - 1}/${total}`);
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get services by category
router.get('/category/:category', serviceController.getServicesByCategory);

// Create a new service
router.post('/', serviceController.createService);

// Update a service
router.put('/:id', serviceController.updateService);

// Delete a service
router.delete('/:id', serviceController.deleteService);

module.exports = router; 