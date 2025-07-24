const Message = require('../models/message');

// Create a message
exports.createMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
    try {
      console.log("Trying to delete:", req.params.id);
      const deleted = await Message.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Message not found" });
      }
      res.status(200).json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
