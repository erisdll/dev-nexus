const jwt = require('jsonwebtoken');

exports.verifyRole = (req, res, next) => {
  try {
    const authHeader = req.get('authorization');

    if (!authHeader) {
      throw new Error('Unauthorized!');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new Error('Unauthorized!');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.user.role !== 'mod' && decoded.user.role !== 'admin') {
      throw new Error('Unauthorized!');
    }
    next();
  } catch (err) {
    if (err.message === 'Unauthorized!') {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!'
      })
    }
  }
};