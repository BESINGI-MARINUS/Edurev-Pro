const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

const userRoutes = require('./Routes/userRoutes');
const globalErrorHandler = require('./utils/globalErrorHandler');
const AppError = require('./utils/AppError');

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Body parser, reading data from body into req.body
app.use(express.json());

// ROUTES
app.use('/api/v1/users', userRoutes);
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
