const express = require('express');
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  deleteMessage,
} = require('../controllers/messageController');

// Route to handle form submissions
router.post('/submit', createMessage);

// Route to get all messages
router.get('/', getAllMessages);

// Route to delete a message by ID
router.delete('/admin/delete/:id', deleteMessage);

module.exports = router;
