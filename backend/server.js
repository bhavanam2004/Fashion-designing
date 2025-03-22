const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a schema for T-shirt designs
const designSchema = new mongoose.Schema({
  color: String, // Store the selected color
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

// Create a model for T-shirt designs
const Design = mongoose.model('Design', designSchema);

// API to save a design
app.post('/api/save-design', async (req, res) => {
  const { color } = req.body; // Get the color from the request body

  try {
    const newDesign = new Design({ color }); // Create a new design document
    await newDesign.save(); // Save to MongoDB
    res.status(201).json({ message: 'Design saved successfully', design: newDesign });
  } catch (error) {
    res.status(500).json({ message: 'Error saving design', error });
  }
});

// API to fetch all designs
app.get('/api/get-designs', async (req, res) => {
  try {
    const designs = await Design.find(); // Fetch all designs from MongoDB
    res.status(200).json(designs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching designs', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});