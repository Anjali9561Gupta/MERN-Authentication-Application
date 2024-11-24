

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Admin routes for managing users (only for admins)
router.get('/users', authMiddleware, async (req, res) => {
  const { role } = req.user;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden' });
  }

  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
