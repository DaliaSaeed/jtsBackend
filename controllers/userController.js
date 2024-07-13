const User = require('../models/user');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const createUser = async (req, res) => {
  try {
    const {name, email, phone, des, experince, title } = req.body;
    const img = req.file ? req.file.path : null;

    const user = new User({
      name,
      email,
      phone,
      des,
      experince, 
      title,
      img
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });;
    }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

const updateUser = async (req, res) => {
  try {
    const { name, email, phone, des, experince, title } = req.body;
    let img;
    if (req.file) {
      img = req.file.path;
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.des = des || user.des;
    user.experince = experince || user.experince;
    user.title = title || user.title;
    if (img) {
      user.img = img;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserById,
  upload
};
