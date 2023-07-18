const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register new user: destructures req data, hashes password.
// Saves user to DB, catches error if needed.
exports.signup = async (req, res, next) => {
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
      status: 'success',
      message: 'Account created succesfully!',
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({
        status: 'fail',
        message: 'Bad request!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error!',
      });
    }
  }
};

// Login: destructures req data, checks user by username or email.
// Checks password, signs user, returns token. Throw errors if needed.
exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (!user) {
      throw new Error('Invalid Data')
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      throw new Error('Invalid Data')
    }
    const payload = {
      userId: user._id,
      role: user.role,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully!',
      token,
    });
  } catch (error) {
    if (error.message === 'Invalid Data') {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid username or password!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error!',
      });
    }
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200);
};