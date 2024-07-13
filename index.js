const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const articleRoutes = require('./routes/articleRoutes');
const apiUploadRouter = require('./routes/apiUploadRouter');
const titleRoutes = require('./routes/addressRouter');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', apiUploadRouter); // Use the upload router at /api/upload

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Use routes
app.use('/users', userRoutes);

//Categories routes
app.use('/categories', categoryRoutes);

//Blog routes
app.use('/articles', articleRoutes);

//Address routes
app.use('/title', titleRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
