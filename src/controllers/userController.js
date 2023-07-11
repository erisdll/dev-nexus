const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Creates new user: verifies token,
// requires admin permission, destructures req data, hashes password.
// Saves user to DB, throws & catches errors if needed.
// -------------------
// -----> TO DO <-----
// -------------------
/* exports.createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      bio,
      selectedLangs,
      selectedTechs,
      selectedAreas,
      deactivated
    } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPass,
      bio,
      selectedLangs,
      selectedTechs,
      selectedAreas,
      deactivated
    });
    await newUser.save();
    res.status(201).json({
      message: 'Account created succesfully!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create account!',
      error: error.message
    });
  }
};
*/


// Verifies JWT token, fetches user profile from DB
// Throws error if no valid auth or if no match
exports.getUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('Unauthorized');
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return res.status(401).json({ message: 'Unauthorized' });
    } else if (error.message === 'User not found') {
      return res.status(404).json({ message: 'User not found' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

exports.updateProfile = async (req, res) => {}

exports.updateSelections = async (req, res) => {}

exports.updatePassword = async (req, res) => {}

exports.deactivateUser = async (req, res) => {}

exports.deleteUser = async (req, res) => {}