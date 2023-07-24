const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateUser, isAdmin } = require('../utils/authenticator');

// User Management Routes
// These are only accessible to admins
router.post('/create', isAdmin, authenticateUser, userController.createUser);
router.patch('/:username', isAdmin, authenticateUser, userController.updateUser);
router.delete('/:username', isAdmin, authenticateUser, userController.deleteUser);

// Common Routes
// These routes are accessible to any user
router.get('/users', userController.getAllUsers);
router.get('/:username', userController.getUser);

// Profile & Settings Routes
// These routes exclusively allow access to an authenticated user's private
// data and enable them to manage >only their own< profile and settings.

router.get('/profile', authenticateUser, userController.getUserProfile);
router.patch('/profile/', authenticateUser, userController.updateProfile);

router.get('/settings', authenticateUser, userController.getUserSettings);
router.patch('/settings', authenticateUser, userController.getUserSettings);
router.patch('/deactivate', authenticateUser, userController.updateUserSettings);

module.exports = router;
