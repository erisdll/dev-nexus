const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateUser, isAdmin } = require('../utils/authenticator');

// User Management Routes
// These are only accessible to admins
router.post('/create', authenticateUser, isAdmin, userController.createUser);
router.patch('/:username', authenticateUser, isAdmin, userController.updateUser);
router.delete('/:username', authenticateUser, isAdmin, userController.deleteUser);

// Common Routes
// These routes are accessible to any user
router.get('/users', userController.getAllUsers);
router.get('/:username', userController.getUser);

// Profile & Settings Routes
// These routes exclusively allow access to an authenticated user's private
// data and enable them to manage >only their own< profile and settings.

router.get('/selections', authenticateUser, userController.getUserSelections);
router.patch('/selections', authenticateUser, userController.updateUserSelections);

router.get('/profile', authenticateUser, userController.getUserProfile); // DONE
router.patch('/profile', authenticateUser, userController.updateUserProfile); // DONE

router.patch('/deactivate', authenticateUser, userController.deactivateAcc); // DONE

module.exports = router;
