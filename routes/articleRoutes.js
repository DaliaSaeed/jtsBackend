const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const userController = require('../controllers/userController'); // For the upload middleware
const displayPreferenceController = require('../controllers/displayPreferenceController');


// Display Preference routes
router.post('/setDisplayMode', displayPreferenceController.setDisplayMode);
router.get('/getDisplayMode', displayPreferenceController.getDisplayMode);
// New routes for articles by category type
router.get('/random/:category', articleController.getRandomArticlesByCategoryType);
router.get('/favorites/:category', articleController.getFavoriteArticlesByCategoryType);
router.get('/most-read/:category', articleController.getMostReadArticlesByCategoryType);

router.get('/most-read', articleController.getMostReadArticles);
router.post('/', userController.upload.single('img'), articleController.createArticle);
router.get('/', articleController.getAllArticles);
router.get('/randamArticles', articleController.randamArticles);
router.get('/getfavorites', articleController.getfavorites);
router.get('/:id', articleController.getArticleById);
router.put('/remove-from-favorites/:id',articleController.removefromfavorites);
router.put('/:id', userController.upload.single('img'), articleController.updateArticleById);
router.delete('/:id', articleController.deleteArticleById);
router.post('/addToFavorites/:id', articleController.addToFavorites);
router.get('/category/:categoryId', articleController.getArticlesByCategory);
router.get('/type/:categoryType', articleController.getArticlesByCategoryType);
router.get('/lastArticles/:type', articleController.getLastArticlesByCategoryType);





module.exports = router;
