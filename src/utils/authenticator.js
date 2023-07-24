const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
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
      isAdmin: decodedToken.isAdmin,
    };

    next();
  } catch (error) {
    if (error.message === 'Unauthorized!') {
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

const isAdmin = (req, res, next) => {
  const isAdmin = req.user.isAdmin;

  if (isAdmin) {
    next();
  } else {
    return res.status(403).json({
      status: 'fail',
      message: 'Forbidden! User is not an admin.',
    });
  }
};

module.exports = {
  authenticateUser,
  isAdmin
}