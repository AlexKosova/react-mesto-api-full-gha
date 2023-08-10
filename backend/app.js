const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const errorMiddlware = require('./middlewares/errors');
const routes = require('./routes/routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allowedCors = [
  'http://mesto.alexkosova.nomoredomains.work/',
  'http://api.mesto.alexkosova.nomoredomains.work/',
  'http://127.0.0.1:3000',
];

const { PORT = 3001 } = process.env;
const app = express();

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
});

app.use(requestLogger);
app.use(express.json());

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddlware);

async function connect() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  app.listen(PORT,
  //    () => {
  //   console.log('PORT');
  // }
  // eslint-disable-next-line function-paren-newline
  );
}

connect();
