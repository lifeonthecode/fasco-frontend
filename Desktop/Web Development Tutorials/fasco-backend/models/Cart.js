const {Schema, model} = require('mongoose');

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {

            product: {
    
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            selectedSize: {
                type: String,
                required: true,
            },
            selectedColor: {
                type: String,
                required: true,
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true,
        default: 0
    }


}, {timestamps: true});

const Cart = model("Cart", cartSchema);
module.exports = Cart;