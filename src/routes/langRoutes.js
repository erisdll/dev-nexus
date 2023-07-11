const express = require('express');
const router = express.Router();
const langController = require('../controllers/langController');

router.post('/programming-languages/', langController.createLang);
router.get('/programming-languages/', langController.updateLang);
router.patch('/programming-languages/', langController.updateLang);
router.delete('/programming-languages/', langController.updateLang);

module.exports = router;
