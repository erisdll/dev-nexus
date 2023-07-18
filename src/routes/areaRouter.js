const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');

router.post('/add', areaController.createArea);
router.get('/', areaController.getAllAreas);
router.get('/:name', areaController.getArea);
router.patch('/:name', areaController.updateArea);
router.delete('/:name', areaController.deleteArea);

module.exports = router;
