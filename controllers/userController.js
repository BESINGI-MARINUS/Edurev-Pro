const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  if (!users)
    return res.status(404).json({
      status: "fail",
      message: "No users found.",
    });

  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
};

exports.getUser = async (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
