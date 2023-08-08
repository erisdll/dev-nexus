const jwt = require('jsonwebtoken');
const AppError = require('./appError');

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw new AppError('No header!', 401);
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = await jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    if (!authHeader) {
      throw new AppError('Invalid Token!', 401);
    }
    req.user = {
      userId: decodedToken.userId,
    };
    next();
  } catch (err) {
    next(err)
  }
};

module.exports = {
  isAuth
}