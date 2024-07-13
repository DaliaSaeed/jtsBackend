// models/User.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  des: {
    type: String,
    required: true
  },
  experince: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
