const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  const resBody = {
    status: 'failure',
    message: err.message || 'Internal Server Error',
  };

  res.status(statusCode).json(resBody);
};

module.exports = errorHandler;