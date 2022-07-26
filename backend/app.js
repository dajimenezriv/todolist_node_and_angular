const express = require('express');
const cors = require('cors');
const tasksRouter = require('./controllers/tasks');
const middleware = require('./utils/middleware');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.postgreSQLHeaders);
app.use(middleware.requestLogger);

app.use('/api/tasks', tasksRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
