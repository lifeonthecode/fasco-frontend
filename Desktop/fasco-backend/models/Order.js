const { Schema, model } = require('mongoose');


const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity must be at least 1'],
                default: 1
            },
            selectedSize: {
                type: String,
                enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                default: 'M',
            },
            selectedColor: {
                type: String,
                required: true,
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },
    
    paymentStatus: {
        type: String,
        enum: ['pending', 'succeeded', 'failed'],
        default: 'pending'
    },
    orderStatus: {
        type: String,
        enum: ['processing', 'shipped', 'delivered', 'cancelled'],
        default: 'processing'
    },
    
    shippingAddress: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        phone: { type: String, required: true },
        country: { type: String, required: true },
        email: { type: String, required: true }
    },

    orderDate: {
        type: Date,
        default: Date.now
    },
    isPaid: {
        type: Boolean,
        enum: [true, false],
        default: false
    }


}, { timestamps: true });


const Order = model('Order', orderSchema);
module.exports = Order