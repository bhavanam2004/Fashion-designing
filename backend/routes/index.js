// routes/index.js
const express = require('express');
const { addDesign } = require('../controllers/adddesign');
const { getDesigns } = require('../controllers/getdesign');
const { login } = require('../controllers/login');
const { logout } = require('../controllers/logout');
const { signup } = require('../controllers/signup');

const router = express.Router();

router.post('/add-design', addDesign);
router.get('/get-designs', getDesigns);
router.post('/login', login);
router.post('/logout', logout);
router.post('/signin',signin);

module.exports = router;