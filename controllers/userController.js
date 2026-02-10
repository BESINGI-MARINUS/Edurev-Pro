const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const createSendToken = require('../utils/createSendToken');

exports.createLecturer = catchAsync(async (req, res) => {
  const { name, email, matricule } = req.body;
  const user = await User.create({ name, email, matricule, role: 'lecturer' });

  createSendToken(user, req, res, 201);
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

exports.getUser = async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
