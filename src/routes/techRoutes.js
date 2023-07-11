const express = require('express');
const router = express.Router();
const techController = require('../controllers/techController');

router.post('/technologies', techController.createTech);
router.get('/technologies', techController.updateTech);
router.patch('/technologies', techController.updateTech);
router.delete('/technologies', techController.updateTech);

module.exports = router;
