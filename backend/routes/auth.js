
const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');  
const User = require('../models/User');



router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // new user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route


router.post('/login', async (req, res) => {
  console.log('Request body:', req.body); 
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'User not found' });
    }

    console.log('User found:', user);

   
    const plainPassword = password; // Password entered by the user
    const hashedPassword = user.password; 

    bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
      if (result) {
        console.log('Passwords match!');
      } else {
        console.log('Passwords do not match.');
      }
    });

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    

    // Generate token and respond
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
