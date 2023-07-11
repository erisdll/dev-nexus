const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.updateUser);
router.patch('/', userController.updateUser);
router.delete('/', userController.updateUser);

module.exports = router;
