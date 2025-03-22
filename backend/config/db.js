// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    // Use the MONGODB_URI from the environment variables
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;