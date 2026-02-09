const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers,
  ); //authController.protect,
router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUser,
  );

module.exports = router;
