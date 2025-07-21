const ChatMessage = require('../models/ChatMessage');

exports.sendMessage = async (req, res) => {
  try {
    const { userId, text, type, audioLength } = req.body;
    const message = new ChatMessage({ userId, text, type, audioLength });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.query;
    const messages = await ChatMessage.find({ userId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 