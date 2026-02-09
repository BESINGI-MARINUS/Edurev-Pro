const jwt = require('jsonwebtoken');

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

module.exports = createSendToken;
