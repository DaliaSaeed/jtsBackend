const express = require('express');
const router = express.Router();
const Title = require('../models/Address');

// Route to get the title
router.get('/', async (req, res) => {
  try {
    const title = await Title.findOne();
    if (title) {
      res.json(title);
    } else {
      res.status(404).json({ message: 'Title not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create the title (only if it doesn't exist)
router.post('/', async (req, res) => {
  try {
    const title = await Title.getOrCreateTitle(req.body);
    res.status(201).json(title);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update the title
router.put('/', async (req, res) => {
  try {
    const title = await Title.updateTitle(req.body);
    res.json(title);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete the title
router.delete('/', async (req, res) => {
  try {
    const title = await Title.findOne();
    if (title) {
      await Title.deleteOne({ _id: title._id });
      res.status(200).json({ message: 'Title deleted successfully' });
    } else {
      res.status(404).json({ message: 'Title not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
