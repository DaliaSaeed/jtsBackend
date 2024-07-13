// db.js
const mongoose = require('mongoose');

// Replace 'your_mongodb_uri' with your actual MongoDB URI
const mongoURI = 'mongodb://127.0.0.1:27017/jts';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
