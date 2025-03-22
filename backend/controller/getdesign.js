// controllers/getdesign.js
const Design = require('../models/Design');

const getDesigns = async (req, res) => {
  try {
    const designs = await Design.find();
    res.status(200).json(designs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching designs', error });
  }
};

module.exports = { getDesigns };