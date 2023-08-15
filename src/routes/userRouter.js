const express = require('express');
const userController = require('../controllers/userController');
const { isAuth } = require('../utils/isAuth');
const { isAdmin } = require('../utils/isAdmin');

const router = express.Router();

// Profile & Settings Routes 
// These routes allow access to an authenticated user's private data.
// They enable them to manage >only their own< profile and settings.
router.get('/selections', isAuth, userController.getUserSelections);
router.patch('/selections', isAuth, userController.updateUserSelections);
router.get('/profile', isAuth, userController.getUserProfile);
router.patch('/profile', isAuth, userController.updateUserProfile);
router.patch('/deactivate', isAuth, userController.deactivateAcc);

// Public Routes
// These routes are accessible to any user.
router.get('/all', userController.getAllUsers);
router.get('/:username', userController.getUser);

// Management Routes
// These are only accessible to admins.
router.post('/add', isAuth, isAdmin, userController.createUser);
router.patch('/:username', isAuth, isAdmin, userController.updateUser);
router.delete('/:username', isAuth, isAdmin, userController.deleteUser);

module.exports = router;
