const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('./appError');

const isAdmin = async (req, res, next) => {
  try {
      const user = await User.findById(req.user.userId);

  if (!user) {
    throw new AppError('User Not Found');
  } if (user.isAdmin === false) {
    throw new AppError('Not authorized!', 401);
  }
  next();
  } catch (err) {
    next(err)
  }
};

module.exports = {
  isAdmin
}