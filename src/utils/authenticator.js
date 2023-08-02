const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/appError');

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw new Error('No header!');
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = await jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    if (!authHeader) {
      throw new AppError('Invalid Token!');
    }
    req.user = {
      userId: decodedToken.userId,
    };
    next();
  } catch (err) {
    next(err)
  }
};

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
  isAuth,
  isAdmin
}