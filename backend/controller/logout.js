// controllers/logout.js
const logout = (req, res) => {
    // Invalidate the token (if using JWT, you may need to implement a token blacklist)
    res.status(200).json({ message: 'Logged out successfully' });
  };
  
  module.exports = { logout };