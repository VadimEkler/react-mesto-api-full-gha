const httpConstants = require('http2').constants;

const errorHandler = (err, req, res, next) => {
  const { statusCode = httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
};

module.exports = errorHandler;
