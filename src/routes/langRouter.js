const express = require('express');
const router = express.Router();
const langController = require('../controllers/langController');
const { authenticateUser, isAdmin } = require('../utils/authenticator');

router.post('/add', authenticateUser, isAdmin, langController.createLang);
router.get('/', langController.getAllLangs);
router.get('/:name', langController.getLang);
router.patch('/:name', authenticateUser, isAdmin, langController.updateLang);
router.delete('/:name', authenticateUser, isAdmin, langController.deleteLang);

module.exports = router;
