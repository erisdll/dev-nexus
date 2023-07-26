const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  const errorResponse = {
    status: 'failure',
    message: message,
  };

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;