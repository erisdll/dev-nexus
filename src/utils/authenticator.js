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
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!authHeader) {
      throw new Error('Invalid Token!');
    }
    req.user = {
      userId: decodedToken.userId,
    };

    next();
  } catch (error) {
    if (
      error.message === 'No header!' ||
      error.message === 'Invalid Token!'
    ) {
      return res.status(401).json({
        status: 'failure',
        message: error.message
      });
    }
    return res.status(500).json({
      status: 'failure',
      message: 'Internal server error!',
    });
  }
};

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    throw new Error('User Not Found');
  }

  if (user.isAdmin === true) {
    next();
  } else {
    return res.status(403).json({
      status: 'fail',
      message: 'Forbidden! User is not an admin.',
    });
  }
};

module.exports = {
  isAuth,
  isAdmin
}