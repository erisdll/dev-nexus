const express = require('express');
const techController = require('../controllers/techController');
const { isAuth } = require('../utils/isAuth');
const { isAdmin } = require('../utils/isAdmin');

const router = express.Router();

router
  .route('/top-five')
  .get(techController.aliasTopTechs, techController.getAllTechs);

router
  .route('/')
  .get(techController.getAllTechs)
  .post(isAuth, isAdmin, techController.createTech);
  
router
  .route('/:name')
  .get(techController.getTech)
  .patch(isAuth, isAdmin, techController.updateTech)
  .delete(isAuth, isAdmin, techController.deleteTech);

module.exports = router;
