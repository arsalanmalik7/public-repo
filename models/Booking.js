const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  estimatedCost: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  additionalInstructions: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema); 