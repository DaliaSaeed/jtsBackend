const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categorController');
const userController = require('../controllers/userController');


router.post('/', userController.upload.single('img'), categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.delete('/:id', categoryController.deleteCategoryById);
router.put('/:id', userController.upload.single('img'), categoryController.updateCategoryById);
router.get('/type/:type', categoryController.getCategoriesByType);

module.exports = router;
