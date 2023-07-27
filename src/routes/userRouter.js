const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateUser, isAdmin } = require('../utils/authenticator');

// Profile & Settings Routes 
// These routes allow access to an authenticated user's private data.
// They enable them to manage >only their own< profile and settings.
router.get('/selections', authenticateUser, userController.getUserSelections);
router.patch('/selections', authenticateUser, userController.updateUserSelections);
router.get('/profile', authenticateUser, userController.getUserProfile);
router.patch('/profile', authenticateUser, userController.updateUserProfile);
router.patch('/deactivate', authenticateUser, userController.deactivateAcc);

// Public Routes
// These routes are accessible to any user.
router.get('/all', userController.getAllUsers);
router.get('/:username', userController.getUser);

// Management Routes
// These are only accessible to admins.
router.post('/add', authenticateUser, isAdmin, userController.createUser);
router.patch('/:username', authenticateUser, isAdmin, userController.updateUser);
router.delete('/:username', authenticateUser, isAdmin, userController.deleteUser);

module.exports = router;
