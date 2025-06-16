const Stripe = require('stripe');
const { default: addressDeliveryCharge } = require('../utils/addressDeliveryCharge');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


const createPaymentIntent = async (req, res) => {
    try {

        const {amount, shippingAddress} = req.body;
        if(!amount || !shippingAddress) {
            return res.status(400).json({
                message: 'All fields required',
                success: false
            })
        };


        const deliverCharge = await addressDeliveryCharge(shippingAddress);

        const totalAmount = amount + deliverCharge;
        if (amount <= 0) {
            return res.status(400).json({
                message: 'Amount must be greater than zero',
                success: false
            });
        }

        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // amount in cents
            currency:'usd',
            payment_method_types: ['card'],
        });


        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            deliverFee: deliverCharge,
            message: 'Payment intent created successfully', 
            success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};

module.exports = createPaymentIntent;