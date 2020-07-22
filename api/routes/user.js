const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then(hashedPassword => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password: hashedPassword
      });
      user
        .save()
        .then(result => {
          res.status(200).json({
            message: 'Signup successful'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Something went wrong',
            error
          });
        });
    })
    .catch(error => {
      return res.status(500).json({
        error
      });
    });
});

module.exports = router;
