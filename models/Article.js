const mongoose = require('mongoose');



const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  img: {
    type: String,
    required: true
  },
  viewsCount: {
    type: Number,
    default: 0 // Default value is 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Boolean,
    default: false
  },
  isFav: {
    type: Boolean,
    default: false
  },
  favorites: {
    type: Number,
    default: 0
  },
});

// Middleware to update the `lastUpdated` field
articleSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.lastUpdated = true;
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Article', articleSchema);
