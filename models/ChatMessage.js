const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String },
  type: { type: String, enum: ['text', 'audio'], default: 'text' },
  audioLength: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema); 