const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../controllers/authController');

const router = express.Router();

// Profile & Settings Routes 
// These routes allow access to an authenticated user's private data.
// They enable them to manage >only their own< profile and settings.
router.get('/selections', protect, userController.getUserSelections);
router.patch('/selections', protect, userController.updateUserSelections);
router.get('/profile', protect, userController.getUserProfile);
router.patch('/profile', protect, userController.updateUserProfile);
router.patch('/deactivate', protect, userController.deactivateAcc);

// Public Routes
// These routes are accessible to any user.
router.get('/all', userController.getAllUsers);
router.get('/:username', userController.getUser);

// Management Routes
// These are only accessible to admins.
router.post('/add', protect, userController.createUser);
router.patch('/:username', protect, userController.updateUser);
router.delete('/:username', protect, userController.deleteUser);

module.exports = router;
