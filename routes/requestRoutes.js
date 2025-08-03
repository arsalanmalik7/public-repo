// routes/requestRoutes.js

const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const Booking = require('../models/Booking');

// Admin: Get all requests (React Admin compatible) - using Booking data
router.get('/requests', async (req, res) => {
  try {
    // Get all bookings without pagination, sorted alphabetically
    const bookings = await Booking.find({})
      .sort({ createdAt: 1 }) // Sort by creation date ascending (A to Z)
      .populate('userId', 'name email'); // Populate user details
    
    // Set the total count in Content-Range header
    const total = bookings.length;
    res.set('Content-Range', `requests 0-${total - 1}/${total}`);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/requests/:id', requestController.getRequestById);

module.exports = router; 