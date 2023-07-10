const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.createUser = async (req, res) => {}

exports.getUser = async (req, res) => {
  try {
    // Verifies JWT token
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('Unauthorized');
    }
    // Fetches user profile from DB
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'Unauthorized') {
      res.status(401).json({ message: 'Unauthorized' });
    } else if (error.message === 'User not found') {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

exports.updateUser = async (req, res) => {}

exports.updateUserItems = async (req, res) => {}

exports.updatePassword = async (req, res) => {}

exports.deactivateAcc = async (req, res) => {}

exports.deleteUser = async (req, res) => {}