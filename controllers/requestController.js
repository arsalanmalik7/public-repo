// controllers/requestController.js
const Booking = require('../models/Booking');

exports.getRequests = async (req, res) => {
  try {
    const bookings = await Booking.find();
    const requests = bookings.map(booking => ({
      id: booking._id.toString(),
      serviceName: booking.service,
      status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
      dateTime: `${booking.date}, ${booking.time}`,
      bookingId: `#${booking._id.toString().slice(-6)}` // last 6 chars for brevity
    }));
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests', error: err.message });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Request not found' });
    }
    // Return the full booking object to match the format of /api/requests
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch request', error: err.message });
  }
}; 