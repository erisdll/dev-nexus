const express = require('express');
const areaController = require('../controllers/areaController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router
  .route('/top-five')
  .get(areaController.aliasTopAreas, areaController.getAllAreas);

router
  .route('/')
  .get(areaController.getAllAreas)
  .post(protect, areaController.createArea);

router
  .route('/:name')
  .get(areaController.getArea)
  .patch(protect, areaController.updateArea)
  .delete(protect, areaController.deleteArea);

module.exports = router;