const express = require('express');
const router = express.Router();
const techController = require('../controllers/techController');
const { authenticateUser, isAdmin } = require('../utils/authenticator');

router.post('/add', authenticateUser, isAdmin, techController.createTech);
router.get('/', techController.getAllTechs);
router.get('/:name', techController.getTech);
router.patch('/:name', authenticateUser, isAdmin, techController.updateTech);
router.delete('/:name', authenticateUser, isAdmin, techController.deleteTech);


module.exports = router;
