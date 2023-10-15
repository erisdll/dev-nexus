const express = require('express');
const langController = require('../controllers/langController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/top-five')
  .get(langController.aliasTopLangs, langController.getAllLangs);

router
  .route('/')
  .get(langController.getAllLangs)
  .post(authController.protect, langController.createLang);

router
  .route('/:name')
  .get(langController.getLang)
  .patch(authController.protect, langController.updateLang)
  .delete(authController.protect, langController.deleteLang);

module.exports = router;
