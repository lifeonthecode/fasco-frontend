const express = require('express');
const { addCart, getCarts, deleteCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

const cartRouter = express.Router();


// cartRouter.get('/carts/:userId',  authMiddleware, getCarts);
cartRouter.get('/carts/:userId',  authMiddleware, getCarts);

cartRouter.post('/add-cart',  authMiddleware, addCart);

cartRouter.delete('/delete-cart/:userId/:productId',  authMiddleware, deleteCart);


module.exports = cartRouter;