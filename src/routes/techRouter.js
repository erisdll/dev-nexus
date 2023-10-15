const express = require('express');
const techController = require('../controllers/techController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/top-five')
  .get(techController.aliasTopTechs, techController.getAllTechs);

router
  .route('/')
  .get(techController.getAllTechs)
  .post(authController.protect, techController.createTech);
  
router
  .route('/:name')
  .get(techController.getTech)
  .patch(authController.protect, techController.updateTech)
  .delete(authController.protect, techController.deleteTech);

module.exports = router;
