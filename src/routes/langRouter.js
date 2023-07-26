const express = require('express');
const router = express.Router();
const langController = require('../controllers/langController');
const { authenticateUser, isAdmin } = require('../utils/authenticator');

// Public Routes
// These routes are accessible to any user.
router.get('/', langController.getAllLangs);
router.get('/:name', langController.getLang);

// Management Routes
// These are only accessible to admins.
router.post('/add', authenticateUser, isAdmin, langController.createLang);
router.patch('/:name', authenticateUser, isAdmin, langController.updateLang);
router.delete('/:name', authenticateUser, isAdmin, langController.deleteLang);

module.exports = router;
