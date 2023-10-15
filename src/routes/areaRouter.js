const express = require('express');
const areaController = require('../controllers/areaController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/top-five')
  .get(areaController.aliasTopAreas, areaController.getAllAreas);

router
  .route('/')
  .get(areaController.getAllAreas)
  .post(authController.protect, areaController.createArea);

router
  .route('/:name')
  .get(areaController.getArea)
  .patch(authController.protect, areaController.updateArea)
  .delete(authController.protect, areaController.deleteArea);

module.exports = router;