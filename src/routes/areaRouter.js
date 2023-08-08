const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');
const { isAuth } = require('../utils/isAuth');
const { isAdmin } = require('../utils/isAdmin');

// Public Routes
// These routes are accessible to any user.
router.get('/', areaController.getAllAreas);
router.get('/:name', areaController.getArea);

// Management Routes
// These are only accessible to admins.
router.post('/add', isAuth, isAdmin, areaController.createArea);
router.patch('/:name', isAuth, isAdmin, areaController.updateArea);
router.delete('/:name', isAuth, isAdmin, areaController.deleteArea);

module.exports = router;
