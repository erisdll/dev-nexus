const express = require('express');
const router = express.Router();
const langController = require('../controllers/langController');

router.post('/', langController.createLang);
router.get('/', langController.getAllLangs);
router.get('/:name', langController.getLang);
router.patch('/:name', langController.updateLang);
router.delete('/:name', langController.deleteLang);

module.exports = router;
