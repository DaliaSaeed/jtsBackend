const Article = require('../models/Article');
const Category = require('../models/Category');


// Create a new article
const createArticle = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      details: req.body.details,
      img: req.file ? req.file.path : null,
    
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// get 5 random articles
const randamArticles = async (req, res) => {

  try {
    const count = await Article.countDocuments();
    const random = Math.floor(Math.random() * count);
    const articles = await Article.find().skip(random).limit(5);
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
}
}
// Get all articles
const getfavorites = async (req, res) => {
  try {
    // Find articles where favorites count is greater than 0
    const favoriteArticles = await Article.find({ favorites: { $gt: 0 } });

    res.status(200).json(favoriteArticles);
  } catch (err) {
    res.status(500).json({ error: err.message });
}
}
const getAllArticles = async (req, res) => {}

// Get a single article by ID
const getArticleById = async (req, res) => {
    try {
      const articleId = req.params.id;
      const article = await Article.findById(articleId).populate('category');
  
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
  
      // Increment viewsCount
      article.viewsCount += 1;
      await article.save();
  
      res.status(200).json(article);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

// Update an article by ID
const updateArticleById = async (req, res) => {
  try {
    const updates = {
      title: req.body.title,
      content: req.body.content,
      details: req.body.details,
      category: req.body.category
    };

    if (req.file) {
      updates.img = req.file.path;
    }

    const article = await Article.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('category');
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an article by ID
const deleteArticleById = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const removefromfavorites = async (req, res) => {
  const articleId = req.params.id;

  try {
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    article.isFav = false;

    // Decrease the favorites count by 1
    if (article.favorites > 0) {
      article.favorites -= 1;
    }

    await article.save();

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
}
}
// Get most read articles
const getMostReadArticles = async (req, res) => {
  try {
    const mostReadArticles = await Article.find().sort({ viewsCount: -1 }).limit(5).populate('category');
    res.status(200).json(mostReadArticles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  };
  
  // Get latest updated articles
  const getLatestUpdatedArticles = async (req, res) => {
    try {
      const articles = await Article.find().sort({ updatedAt: -1 }).limit(10);
      res.status(200).json(articles);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Get recently added articles
  const getRecentlyAddedArticles = async (req, res) => {
    try {
      const articles = await Article.find().sort({ createdAt: -1 }).limit(10);
      res.status(200).json(articles);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  // Get all articles by category ID
const getArticlesByCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
  
      // Find articles where category matches categoryId
      const articles = await Article.find({ category: categoryId });
  
      res.status(200).json(articles);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Get all articles by category type
  const getArticlesByCategoryType = async (req, res) => {
    try {
      const categoryType = req.params.categoryType;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
  
      // Find categories by type
      const categories = await Category.find({ type: categoryType });
  
      if (!categories.length) {
        return res.status(404).json({ error: 'Categories not found' });
      }
  
      // Get category IDs
      const categoryIds = categories.map(cat => cat._id);
  
      // Find articles where category matches any of the category IDs
      const articles = await Article.find({ category: { $in: categoryIds } })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
  
      // Get the total number of articles
      const totalItems = await Article.countDocuments({ category: { $in: categoryIds } });
  
      res.status(200).json({ articles, totalItems });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
 // Get last articles by category type
const getLastArticlesByCategoryType = async (req, res) => {
    const type = req.params.type;
  
    try {
      // Find categories matching the type
      const categories = await Category.find({ type });
  
      // Array to store results
      let lastArticles = [];
  
      // Iterate through each category and find the last article
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
  
        // Find the last article in this category
        const lastArticle = await Article.findOne({ category: category._id })
          .sort({ createdAt: -1 })
          .populate('category'); // Populate category details if needed
  
        // Push the last article to the results array
        if (lastArticle) {
          lastArticles.push(lastArticle);
        }
      }
  
      res.status(200).json(lastArticles);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const addToFavorites = async (req, res) => {
    try {
      const articleId = req.params.id;
  
      // Find the article by ID
      const article = await Article.findById(articleId);
  
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
      article.isFav = true;
  
      // Update the favorites count
      article.favorites += 1;
      await article.save();
  
      res.status(200).json(article);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  // Get random articles by category type
  getRandomArticlesByCategoryType = async (req, res) => {
    const { category } = req.params;
    try {
      const articles = await Article.aggregate([
        { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'category' } },
        { $match: { 'category.type': category } },
        { $sample: { size: 5 } } // Get 5 random articles
      ]);
      res.status(200).json(articles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Get favorite articles by category type
getFavoriteArticlesByCategoryType = async (req, res) => {
  const { category } = req.params;
  try {
    const articles = await Article.find({ isFav: true })
      .populate({
        path: 'category',
        match: { type: category }
      })
      .exec();
      
    // Filter out articles where the category is null
    const filteredArticles = articles.filter(article => article.category !== null);

    res.status(200).json(filteredArticles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Get most-read articles by category type
getMostReadArticlesByCategoryType = async (req, res) => {
  const { category } = req.params;
  try {
    const articles = await Article.find()
      .populate({
        path: 'category',
        match: { type: category }
      })
      .sort({ viewsCount: -1 })
      .limit(5)
      .exec();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  getMostReadArticles,
  getLatestUpdatedArticles,
  getRecentlyAddedArticles,
  getArticlesByCategory,
  getArticlesByCategoryType,
  getLastArticlesByCategoryType,
  addToFavorites,
  getfavorites,
  removefromfavorites,
  randamArticles,
  getMostReadArticlesByCategoryType,
  getFavoriteArticlesByCategoryType,
  getRandomArticlesByCategoryType

};
