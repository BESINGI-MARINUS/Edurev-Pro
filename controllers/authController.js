const User = require("../models/userModel");

exports.signup = async (req, res) => {
  const { name, email, matricule } = req.body;

  const user = await User.create({ name, email, matricule });
  res.status(200).json({
    status: "success",
    message: "Signup Successfully.",
    data: { user },
  });
};

exports.login = async (req, res) => {
  const { email, matricule } = req.body;

  const user = await User.findOne({ email }).select("+matricule");

  if (!user || !(await user.correctMatricule(matricule, user.matricule))) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or matricule!",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Login Successfully.",
    data: { user },
  });
};
