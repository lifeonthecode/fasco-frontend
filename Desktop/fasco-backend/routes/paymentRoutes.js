const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const createPaymentIntent = require('../controllers/paymentController');


const paymentRouter = express.Router();

paymentRouter.post('/create-payment-intent', authMiddleware, createPaymentIntent);

module.exports= paymentRouter;

