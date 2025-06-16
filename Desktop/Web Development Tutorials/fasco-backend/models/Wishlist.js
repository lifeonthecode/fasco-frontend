const { Schema, model } = require('mongoose');


const wishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    ]
}, { timestamps: true });


const Wishlist = model('Wishlist', wishlistSchema);
module.exports = Wishlist;