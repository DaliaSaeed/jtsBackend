const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/', userController.upload.single('img'), userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.upload.single('img'), userController.updateUser);


module.exports = router;
