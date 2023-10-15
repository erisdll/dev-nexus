const express = require('express');
const langController = require('../controllers/langController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router
  .route('/top-five')
  .get(langController.aliasTopLangs, langController.getAllLangs);

router
  .route('/')
  .get(langController.getAllLangs)
  .post(protect, langController.createLang);

router
  .route('/:name')
  .get(langController.getLang)
  .patch(protect, langController.updateLang)
  .delete(protect, langController.deleteLang);

module.exports = router;
