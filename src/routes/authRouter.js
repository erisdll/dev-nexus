const express = require('express');
const authController = require('../controllers/authController');
const { isAuth } = require('../utils/isAuth');
const { isAdmin } = require('../utils/isAdmin');

const router = express.Router();

router
  .post('/signup', authController.signup)
  .post('/login', authController.login)
  .patch('/settings/change-password', isAuth, authController.updatePassword);

module.exports = router;
