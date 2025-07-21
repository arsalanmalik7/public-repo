const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const ChatMessage = require('../models/ChatMessage');

router.post('/send', chatController.sendMessage);

// Admin: Get all chat messages (React Admin compatible)
router.get('/messages', async (req, res) => {
  try {
    const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
    const range = req.query.range ? JSON.parse(req.query.range) : [0, 9];
    const sort = req.query.sort ? JSON.parse(req.query.sort) : ['_id', 'ASC'];
    const sortField = sort[0];
    const sortOrder = sort[1] === 'ASC' ? 1 : -1;
    const skip = range[0];
    const limit = range[1] - range[0] + 1;
    const total = await ChatMessage.countDocuments(filter);
    const messages = await ChatMessage.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);
    res.set('Content-Range', `chat/messages ${skip}-${skip + messages.length - 1}/${total}`);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 