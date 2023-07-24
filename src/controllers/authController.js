const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register new user: destructures req data, hashes password.
// Saves user to DB, catches error if needed.
exports.signup = async (req, res) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;
    
    if (password !== passwordConfirm) {
      throw new Error('Passwords do not match');
    } 
    
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPass,
    });
    await newUser.save();
    return res.status(201).json({
      status: 'success',
      message: 'Account created succesfully!',
    });
  } catch (err) {
    if (err.message === 'Passwords do not match') {
      res.status(400).json({
        status: 'fail',
        message: 'Passwords do not match!',
      });
    } else {
      return res.status(500).json({
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
      throw new Error('Invalid credentials!')
    }

    if (user.deactivated === true) {
      throw new Error('This account is deactivated!')
    }

    const validPass = await bcrypt.compare(password, user.password);
    
    if (!validPass) {
      throw new Error('Invalid credentials!')
    }

    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET
    );

    user.lastLogin = Date.now();
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Logged in successfully!',
      token,
    });

  } catch (err) {
    if (
      err.message === 'Invalid credentials!' ||
      err.message === 'This Account is Deactivated!'
    ) {
      return res.status(401).json({
        status: 'fail',
        message: err.message,
      });
    } else {
      return res.status(500).json({
        status: 'fail',
        message: 'Internal server error!',
      });
    }
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { currentPass, newPassword, newPasswordConfirm } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const validCurrentPass = await bcrypt.compare(
      currentPass,
      user.password
    );

    if (!validCurrentPass) {
      throw new Error('Invalid password');
    }
    if (newPassword !== newPasswordConfirm) {
      throw new Error('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully!',
    });
  } catch (err) {
    if (err.message === 'Passwords do not match') {
      res.status(400).json({
        status: 'fail',
        message: 'Passwords do not match!',
      });
    } else if (err.message === 'Invalid password') {
      res.status(401).json({
        status: 'fail',
        message: 'Invalid password!',
      });
    } else if (err.message === 'User not found') {
      res.status(404).json({
        status: 'fail',
        message: 'User not found!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};