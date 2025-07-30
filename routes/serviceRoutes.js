const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all services (no backend filter/sort/pagination, for frontend filtering)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.set('Content-Range', `services 0-${services.length - 1}/${services.length}`);
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get services by category
router.get('/category/:category', serviceController.getServicesByCategory);

// Create a new service (admin only)
router.post('/', auth, admin, serviceController.createService);

// Update a service (admin only)
router.put('/:id', auth, admin, serviceController.updateService);

// Delete a service (admin only)
router.delete('/:id', auth, admin, serviceController.deleteService);

module.exports = router; 