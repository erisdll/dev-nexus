const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register new user: destructures req data, hashes password.
// Saves user to DB, catches error if needed.
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPass,
    });
    await newUser.save();
    res.status(201).json({
      message: 'Account created succesfully!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create account!',
    });
  }
};

// Login: destructures req data, checks user by username or email.
// Checks password, signs user, returns token. Throw errors if needed.
exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
    if (!user) {
      throw new Error('Invalid user data')
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      throw new Error('Invalid user data')
    }
    const payload = {
      userId: user._id,
      role: user.role,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json(token);
  } catch (error) {
    if (error.message === 'Invalid user data') {
      return res.status(401).json({ message: 'Invalid username or password!' });
    } else {
      return res.status(500).json({});
    }
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200);
};