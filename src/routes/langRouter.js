const express = require('express');
const langController = require('../controllers/langController');
const { isAuth } = require('../utils/isAuth');
const { isAdmin } = require('../utils/isAdmin');

const router = express.Router();

router
  .route('/top-five')
  .get(langController.aliasTopLangs, langController.getAllLangs);

router
  .route('/')
  .get(langController.getAllLangs)
  .post(isAuth, isAdmin, langController.createLang);

router
  .route('/:name')
  .get(langController.getLang)
  .patch(isAuth, isAdmin, langController.updateLang)
  .delete(isAuth, isAdmin, langController.deleteLang);

module.exports = router;
