const express = require('express');
const router = express.Router();
const langController = require('../controllers/langController');

router.post('/programming-languages/add', langController.createLang);
router.get('/programming-languages/', langController.getAllLang);
router.get('/programming-languages/:id', langController.getLang);
router.patch('/programming-languages/', langController.updateLang);
router.delete('/programming-languages/', langController.deleteLang);

module.exports = router;
