const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const expressStatsd = require('express-statsd');
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./controllers/tasks');
const middleware = require('./utils/middleware');

const app = express();

Sentry.init({
  dsn: 'https://2b9bc64ed5e749049ca84977e5e89c51@o1335383.ingest.sentry.io/6603803',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  // captures 100% of errors
  tracesSampleRate: 1.0,
});

// requestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
// app.use(Sentry.Handlers.requestHandler());
// tracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());

// metrics with statsd
// only counts the number of requests and status codes
app.use(expressStatsd());

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.postgreSQLHeaders);
app.use(middleware.requestLogger);

app.use('/api/tasks', tasksRouter);

// the error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
app.use(middleware.unknownEndpoint);
app.use(((err, req, res) => {
  // the error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.status(500).end(`${res.sentry}\n`);
}));

module.exports = app;
