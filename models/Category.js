const mongoose = require('mongoose');
const Article = require('./Article'); // Import the Article model

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['JtsBlog', 'JtsMagazine'],
    required: true
  },
  img: {
    type: String
  }
}, {
  timestamps: true
});

// Middleware to delete related articles before deleting the category
categorySchema.pre('findByIdAndDelete', async function (next) {
  const categoryId = this.getQuery()._id;
  await Article.deleteMany({ category: categoryId });
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
