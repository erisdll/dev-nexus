const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router
  .post('/signup', authController.signup)
  .post('/login', authController.login)
  .patch('/settings/change-password', protect, authController.updatePassword);

module.exports = router;
