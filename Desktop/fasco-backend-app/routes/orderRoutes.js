const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createOrder, getUserOrders, cancelledOrder, getAdminOrders, updateOrderOnlyAdmin, deleteSingleOrder, getSingleOrder } = require('../controllers/orderController');
const adminMiddleware = require('../middlewares/adminMiddleware');


const orderRouter = express.Router();
// order create 
orderRouter.post('/create-order', authMiddleware, createOrder);

// get orders only user 
orderRouter.get('/orders/:userId', authMiddleware, getUserOrders);

// get single order 
orderRouter.get('/order/:id', authMiddleware, getSingleOrder);

// order cancelled only user 
orderRouter.put('/user-order-cancelled/:orderId', authMiddleware, cancelledOrder);


// get orders only admin 
orderRouter.get('/orders', authMiddleware, adminMiddleware, getAdminOrders);

// delete order only admin 
orderRouter.delete('/delete/order/:id', authMiddleware, adminMiddleware, deleteSingleOrder);



// update order only admin 
orderRouter.put('/update-order-status-only-admin/:orderId', authMiddleware, adminMiddleware, updateOrderOnlyAdmin);





module.exports= orderRouter;