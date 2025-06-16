const Cart = require("../models/Cart");
const { mongoose } = require('mongoose');
const Product = require("../models/Product");
const { default: calculateCartTotals } = require("../utils/calculateCartTotals");


const addCart = async (req, res) => {
    try {

        const { userId, productId, quantity, selectedSize, selectedColor } = req.body;
        if (!userId || !productId || !quantity || !selectedSize || !selectedColor) {
            return res.status(400).json(
                {
                    message: 'All fields are required',
                    success: false
                }
            )
        };

        const parsedQuantity = parseInt(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity < 0) {
            return res.status(400).json(
                {
                    message: 'Quantity must be a positive number',
                    success: false
                }
            )
        };




        let cart = await Cart.findOne({ user: userId });
        if (cart) {
            const existingProduct = cart.products.find(p => p.product.toString() === productId);

            if (existingProduct) {
                existingProduct.quantity = parsedQuantity;
                existingProduct.selectedSize = selectedSize;
                existingProduct.selectedColor = selectedColor;
            } else {
                cart.products.push({
                    product: productId,
                    quantity: parsedQuantity,
                    selectedSize,
                    selectedColor
                })
            }

            await cart.save();


        } else {
            cart = new Cart({
                user: userId,
                products: [
                    {
                        product: productId,
                        quantity: parsedQuantity,
                        selectedSize,
                        selectedColor
                    }
                ]
            });
        };

        let totalAmount = 0;

        for (const item of cart.products) {
            const product = await Product.findById(item.product);

            if (product) {
                totalAmount += product.discountPrice * item.quantity;
            }
        }
        cart.totalAmount;
        await cart.save();

        res.status(201).json({
            message: 'Cart created and updated successfully',
            success: true,
            cart
        })




    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};

const getCarts = async (req, res) => {
    try {


        const userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID',
                success: false
            });
        }

        const cart = await Cart.findOne({ user: userId }).populate('products.product')
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found',
                success: false
            })
        };
        const { totalPrice, totalItems, subtotal, totalDiscount, discount } = await calculateCartTotals(cart);
        res.status(200).json({
            message: 'Successfully carts get',
            success: true,
            cart,
            subtotal,
            totalDiscount,
            totalItems,
            totalPrice,
            discount
        })

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};


const deleteCart = async (req, res) => {
    try {

        if (!req.params.userId || !req.params.productId) {
            return res.status(400).json({
                message: 'Cart not found',
                success: false
            })
        }


        const cart = await Cart.findOneAndUpdate(
            {
                user: req.params.userId,
            },
            {
                $pull: {
                    'products': {
                        'product': req.params.productId
                    }
                }
            },
            {
                new: true
            }
        );

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found',
                success: false
            })
        };

        res.status(200).json({
            message: 'Successfully deleted cart',
            success: true,
            cart
        })

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};


module.exports = {
    addCart,
    getCarts,
    deleteCart
}