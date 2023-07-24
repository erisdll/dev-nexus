const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');
const { authenticateUser, isAdmin } = require('../utils/authenticator');

router.post('/add', authenticateUser, isAdmin, areaController.createArea);
router.get('/', areaController.getAllAreas);
router.get('/:name', areaController.getArea);
router.patch('/:name', authenticateUser, isAdmin, areaController.updateArea);
router.delete('/:name', authenticateUser, isAdmin, areaController.deleteArea);

module.exports = router;
