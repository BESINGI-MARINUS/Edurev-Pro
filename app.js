const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

const userRoutes = require('./Routes/userRoutes');

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Body parser, reading data from body into req.body
app.use(express.json());

// ROUTES
app.use('/api/v1/users', userRoutes);
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use((err, req, res, next) => {
  err.statusCode = err.status || 500;
  err.status = err.status || 'error';

  next(err);
});
module.exports = app;
