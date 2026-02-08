const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, req, res, statusCode) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure:
      process.env.NODE_ENV === 'production' ||
      req.secure ||
      req.headers['x-forwarded-proto'] === 'https',
  });

  user.matricule = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

exports.signup = catchAsync(async (req, res) => {
  const { name, email, matricule } = req.body;
  const user = await User.create({ name, email, matricule });

  createSendToken(user, req, res, 201);
});

exports.login = catchAsync(async (req, res) => {
  const { email, matricule } = req.body;

  const user = await User.findOne({ email }).select('+matricule');

  if (!user || !(await user.correctMatricule(matricule, user.matricule))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or matricule!',
    });
  }

  createSendToken(user, req, res, 200);
});
