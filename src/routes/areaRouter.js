const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');
const { authenticateUser, isAdmin } = require('../utils/authenticator');

// Public Routes
// These routes are accessible to any user.
router.get('/', areaController.getAllAreas);
router.get('/:name', areaController.getArea);

// Management Routes
// These are only accessible to admins.
router.post('/add', authenticateUser, isAdmin, areaController.createArea);
router.patch('/:name', authenticateUser, isAdmin, areaController.updateArea);
router.delete('/:name', authenticateUser, isAdmin, areaController.deleteArea);

module.exports = router;
