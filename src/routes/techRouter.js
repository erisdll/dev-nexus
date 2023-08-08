const express = require('express');
const router = express.Router();
const techController = require('../controllers/techController');
const { isAuth } = require('../utils/isAuth');
const { isAdmin } = require('../utils/isAdmin');

// Public Routes
// These routes are accessible to any user.
router.get('/', techController.getAllTechs);
router.get('/:name', techController.getTech);

// Management Routes
// These are only accessible to admins.
router.post('/add', isAuth, isAdmin, techController.createTech);
router.patch('/:name', isAuth, isAdmin, techController.updateTech);
router.delete('/:name', isAuth, isAdmin, techController.deleteTech);

module.exports = router;
