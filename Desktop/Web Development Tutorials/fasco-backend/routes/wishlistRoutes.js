const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { addWishlist, deleteAllWishlist, deleteSingleWishlist, getWishlists } = require('../controllers/wishlistController');

const wishlistRouter = express.Router();

wishlistRouter.post('/add-wishlist', authMiddleware, addWishlist);


wishlistRouter.get('/wishlists/:userId', authMiddleware, getWishlists);




wishlistRouter.delete('/delete-wishlist/:userId/:productId', authMiddleware, deleteSingleWishlist);


wishlistRouter.delete('/delete-all-wishlist/:userId', authMiddleware, deleteAllWishlist);




module.exports = wishlistRouter;