const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
  first_title: { type: String, required: true },
  secound_title: { type: String, required: true },
}, { timestamps: true });

titleSchema.statics.getOrCreateTitle = async function (titleData) {
  let title = await this.findOne();
  if (!title) {
    title = await this.create(titleData);
  }
  return title;
};

titleSchema.statics.updateTitle = async function (titleData) {
  let title = await this.findOne();
  if (title) {
    title.set(titleData);
    return title.save();
  } else {
    throw new Error('Title not found');
  }
};

const Title = mongoose.model('Title', titleSchema);

module.exports = Title;
