// controllers/displayPreferenceController.js
const DisplayPreference = require('../models/DisplayPreference');

let displayMode = 'favorites'; // Default display mode
// Set display mode
exports.setDisplayMode = async (req, res) => {
  try {
    const { mode } = req.body;

    if (!['favorites', 'random', 'most-read'].includes(mode)) {
      return res.status(400).json({ error: 'Invalid display mode' });
    }

    let preference = await DisplayPreference.findOne();
    if (!preference) {
      preference = new DisplayPreference({ mode });
    } else {
      preference.mode = mode;
    }

    await preference.save();
    res.status(200).json({ message: 'Display mode updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get display mode
exports.getDisplayMode = async (req, res) => {
  try {
    const preference = await DisplayPreference.findOne();
    if (!preference) {
      return res.status(404).json({ error: 'Display mode not set' });
    }
    res.status(200).json(preference);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
