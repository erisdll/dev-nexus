const express = require('express');
const areaController = require('../controllers/areaController');
const { isAuth } = require('../utils/isAuth');
const { isAdmin } = require('../utils/isAdmin');

const router = express.Router();

router
  .route('/top-five')
  .get(areaController.aliasTopAreas, areaController.getAllAreas);

router
  .route('/')
  .get(areaController.getAllAreas)
  .post(isAuth, isAdmin, areaController.createArea);

router
  .route('/:name')
  .get(areaController.getArea)
  .patch(isAuth, isAdmin, areaController.updateArea)
  .delete(isAuth, isAdmin, areaController.deleteArea);

module.exports = router;