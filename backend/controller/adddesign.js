// controllers/adddesign.js
const Design = require('../models/Design');

const addDesign = async (req, res) => {
  const { title, description, imageUrl } = req.body;

  try {
    const newDesign = new Design({ title, description, imageUrl });
    await newDesign.save();
    res.status(201).json({ message: 'Design added successfully', design: newDesign });
  } catch (error) {
    res.status(500).json({ message: 'Error adding design', error });
  }
};

module.exports = { addDesign };