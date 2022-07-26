const config = require('./config');
const logger = require('./logger');

const postgreSQLHeaders = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', `http://localhost:${config.PORT}`);
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
};

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  return next(error);
};

module.exports = {
  postgreSQLHeaders,
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
