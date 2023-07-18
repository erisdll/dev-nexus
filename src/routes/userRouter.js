const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:name', userController.getUser);
router.patch('/:name', userController.updateUser);
router.delete('/:name', userController.deleteUser);


module.exports = router;
