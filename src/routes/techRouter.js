const express = require('express');
const router = express.Router();
const techController = require('../controllers/techController');

router.post('/', techController.createTech);
router.get('/', techController.getAllTechs);
router.get('/:name', techController.getTech);
router.patch('/:name', techController.updateTech);
router.delete('/:name', techController.deleteTech);


module.exports = router;
