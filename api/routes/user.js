const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'User already registered. Please login!'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashedPassword
    });
    await user.save();
    res.status(200).json({
      message: 'Signup successful'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong.',
      error
    });
  }
});

module.exports = router;
