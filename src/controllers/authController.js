const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/appError');
const APIfeatures = require('../utils/apiFeatures');

// Register new user: destructures req data, hashes password.
// Saves user to DB, catches error if needed.
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, confirmPass } = req.body;
    
    if (password !== confirmPass) {
      throw new AppError('Passwords do not match', 400);
    } 

    console.log(password)

    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    let hashPass = null
    if (regexPass.test(password)) {
      hashPass = await bcrypt.hash(password, 10);
    } else {
      throw new AppError(
        'Password must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.',
        400,
      );
    }
    
    const newUser = new User({
      username,
      email,
      password: hashPass,
    });
    const savedUser = await newUser.save();
    return res.status(201).json({
      status: 'success',
      message: 'Account created succesfully!',
      data: { savedUser },
    });
  } catch (err) {
    return next(err);
  }
};

// Login: destructures req data, checks user by username or email.
// Checks password, signs user, returns token. Throw errors if needed.
exports.login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (!user) {
      throw new AppError('Invalid credentials!', 401);
    }

    if (user.deactivated === true) {
      throw new AppError('This account is deactivated!', 401);
    }

    const validPass = await bcrypt.compare(password, user.password);
    
    if (!validPass) {
      throw new AppError('Invalid credentials!', 401);
    }

    const token = jwt.sign(
      {
        userId: user._id, expiresIn: process.env.EXPIRES_IN
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
    return next(err)
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { currentPass, newPassword, newPassConfirm } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found!', 404);
    }
    if (newPassword !== newPassConfirm) {
      throw new AppError('Passwords do not match', 400);
    }

    const validCurrentPass = await bcrypt.compare(
      currentPass,
      user.password
    );

    if (!validCurrentPass) {
      throw new AppError('Invalid credentials!', 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully!',
    });
  } catch (err) {
    return next(err);
  }
};