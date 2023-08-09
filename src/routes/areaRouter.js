const express = require('express');
const router = express.Router();
const {
  aliasForAreas,
  createArea,
  getAllAreas,
  getArea,
  updateArea,
  deleteArea
} = require('../controllers/areaController');

const { isAuth, isAdmin } = require('../utils/authenticator');

router.route('/top-five')
  .get(aliasForAreas, getAllAreas)

router
  .route('/')
  .get(getAllAreas)
  .post(isAuth, isAdmin, createArea);

router
  .route('/:name')
  .get(getArea)
  .patch(isAuth, isAdmin, updateArea)
  .delete(isAuth, isAdmin, deleteArea);

module.exports = router;