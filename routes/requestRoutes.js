// routes/requestRoutes.js

const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const Request = require('../models/Request');

// Admin: Get all requests (React Admin compatible)
router.get('/requests', async (req, res) => {
  try {
    const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
    const range = req.query.range ? JSON.parse(req.query.range) : [0, 9];
    const sort = req.query.sort ? JSON.parse(req.query.sort) : ['_id', 'ASC'];
    const sortField = sort[0];
    const sortOrder = sort[1] === 'ASC' ? 1 : -1;
    const skip = range[0];
    const limit = range[1] - range[0] + 1;
    const total = await Request.countDocuments(filter);
    const requests = await Request.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);
    res.set('Content-Range', `requests ${skip}-${skip + requests.length - 1}/${total}`);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/requests/:id', requestController.getRequestById);

module.exports = router; 