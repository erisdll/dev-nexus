const express = require('express');
const router = express.Router();
const langController = require('../controllers/langController');
const { isAuth } = require('../utils/isAuth');
const { isAdmin } = require('../utils/isAdmin');

// Public Routes
// These routes are accessible to any user.
router.get('/', langController.getAllLangs);
router.get('/:name', langController.getLang);

// Management Routes
// These are only accessible to admins.
router.post('/add', isAuth, isAdmin, langController.createLang);
router.patch('/:name', isAuth, isAdmin, langController.updateLang);
router.delete('/:name', isAuth, isAdmin, langController.deleteLang);

module.exports = router;
