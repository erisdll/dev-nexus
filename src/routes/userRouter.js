const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Profile & Settings Routes
// These routes allow access to an authenticated user's private data.
// They enable them to manage >only their own< profile and settings.
router.get(
  '/selections',
  authController.protect,
  authController.restricTo('user'),
  userController.getUserSelections,
);
router.patch(
  '/selections',
  authController.protect,
  authController.restricTo('user'),
  userController.updateUserSelections,
);
router.get(
  '/profile',
  authController.protect,
  authController.restricTo('user'),
  userController.getUserProfile,
);
router.patch(
  '/profile',
  authController.protect,
  authController.restricTo('user'),
  userController.updateUserProfile,
);
router.patch(
  '/deactivate',
  authController.restricTo('user'),
  authController.protect,
  userController.deactivateAcc,
);

// Public Routes
// These routes are accessible to any user.
router.get('/all', userController.getAllUsers);
router.get('/:username', userController.getUser);

// Management Routes
// These are only accessible to admins.
router.post(
  '/add',
  authController.protect,
  authController.restricTo('admin'),
  userController.createUser,
);
router.patch(
  '/:username',
  authController.protect,
  authController.restricTo('admin'),
  userController.updateUser,
);
router.delete(
  '/:username',
  authController.protect,
  authController.restricTo('admin'),
  userController.deleteUser,
);

module.exports = router;
