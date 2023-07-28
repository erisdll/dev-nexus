const express = require('express');
const router = express.Router();
const techController = require('../controllers/techController');
const { authenticateUser, isAdmin } = require('../utils/authenticator');

// Public Routes
// These routes are accessible to any user.
router.get('/', techController.getAllTechs);
router.get('/:name', techController.getTech);

// Management Routes
// These are only accessible to admins.
router.post('/add', authenticateUser, isAdmin, techController.createTech);
router.patch('/:name', authenticateUser, isAdmin, techController.updateTech);
router.delete('/:name', authenticateUser, isAdmin, techController.deleteTech);

module.exports = router;
