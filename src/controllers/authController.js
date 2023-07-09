const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Creates a new user
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
    console.log(`New user! ${newUser.username} just signed up.`);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create account! :(', error: error.message });
  }
};

// Logs a user in
exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password!' });
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(401).json({ message: 'Invalid username or password!' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json(token);
    console.log(`User ${username} logged in.`)
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'An error occurred during login',
        error: error.message,
      });
  }
};

// Logs a user out
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'User logged out successfully' });
  if (req.body != undefined) {
    const { username } = req.body;
    return console.log(`User ${username} logged out.`);
  }
  console.log(`Unidentified user logged out.`);
};