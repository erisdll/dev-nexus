const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateUser } = require('../utils/authenticator');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.patch('/settings/change-password', authenticateUser, authController.updatePassword);

module.exports = router;
