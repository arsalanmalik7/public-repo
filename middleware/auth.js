const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      console.log('No Authorization header found');
      return res.status(401).json({ success: false, message: 'Please authenticate.' });
    }

    // Extract token from Bearer
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      console.log('No token found in Authorization header');
      return res.status(401).json({ success: false, message: 'Please authenticate.' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Find user
      const user = await User.findOne({ _id: decoded.userId });
      if (!user) {
        console.log('User not found for token');
        return res.status(401).json({ success: false, message: 'Please authenticate.' });
      }

      // Add user and token to request
      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      console.log('Token verification failed:', error.message);
      return res.status(401).json({ success: false, message: 'Please authenticate.' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ success: false, message: 'Please authenticate.' });
  }
};

module.exports = auth; 