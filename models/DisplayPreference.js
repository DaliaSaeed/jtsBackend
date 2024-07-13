// models/DisplayPreference.js
const mongoose = require('mongoose');

const displayPreferenceSchema = new mongoose.Schema({
  mode: {
    type: String,
    enum: ['favorites', 'random', 'most-read'],
    required: true
  }
});

module.exports = mongoose.model('DisplayPreference', displayPreferenceSchema);
