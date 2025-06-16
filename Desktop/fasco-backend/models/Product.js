const { Schema, model } = require('mongoose');



const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    size: {
        type: String,
        required: true,
    },
    colors: {
        type: [String],
        required: true
    },
    images: [
        {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
        }
    ],
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    star: {
        type: Number,
        required: true,
        default: 0
    },
    isBestSeller: {
        type: Boolean,
        required: true,
        default: false
    },
    deals: {
        isDeals: {

            type: Boolean,
            required: true,
            default: false
        },
        dealsEndDate: {
            type: Date,
        }
    },
    sold: {
        type: Number,
        required: true,
        default: 0
    }


}, { timestamps: true });


const Product = model('Product', productSchema);
module.exports = Product;