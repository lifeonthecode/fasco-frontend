const Order = require("../models/Order");
const handleUpdateProduct = require("../utils/handleUpdateProduct");

const createOrder = async (req, res) => {
    try {


        const { user, products, shippingAddress, orderStatus, totalAmount, paymentStatus } = req.body;

        if (!user || products.length < 0 || !shippingAddress || !orderStatus || !totalAmount || !paymentStatus) {
            return res.status(400).json({
                message: "Products are required to create an order",
                success: false
            });
        };



        await handleUpdateProduct(products);
        const newOrder = new Order({
            user,
            products,
            shippingAddress,
            orderStatus,
            totalAmount,
            paymentStatus,
            isPaid: true
        });
        await newOrder.save();

        res.status(201).json({
            message: 'Successfully created order',
            success: true,
        })

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};



// only user get orders 
const getUserOrders = async (req, res) => {
    try {

        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({
                message: "Please provide userId",
                success: false
            })
        };


        const orders = await Order.find({
            user: userId
        }).populate('products.product');
        const totalItems = await Order.countDocuments({ user: userId })
        if (!orders) {
            return res.status(404).json({
                message: "Order not found",
                success: false
            })
        };


        res.status(200).json(
            {
                message: "All Orders",
                success: true,
                orders,
                totalItems
            }
        )


    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};


// only admin get single order
const getSingleOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide order ID",
            });
        }

        const order = await Order.findById(id).populate('products.product');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            order,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// only admin delete order
const deleteSingleOrder = async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Please provide ID",
                success: false
            })
        };


        const deleteOrder = await Order.findByIdAndDelete(id);
        if (!deleteOrder) {
            return res.status(404).json(
                {
                    message: "Not found order ID",
                    success: false,
                }
            )
        }

        res.status(200).json(
            {
                message: "Order delete success",
                success: true,
            }
        )


    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};


// order cancelled only user 
const cancelledOrder = async (req, res) => {
    try {

        const { orderId } = req.params;
        if (!orderId) {
            return res.status(400).json({
                message: "Please provide userId",
                success: false
            })
        };


        const cancelledOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                orderStatus: 'cancelled',
            },

            {
                new: true
            }
        );

        if (!cancelledOrder) {
            return res.status(404).json({
                message: "Order not found",
                success: false
            })
        }

        res.status(200).json({
            message: "Successfully order cancelled!",
            success: true,
        })

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
}

// get all order only admin panel
const getAdminOrders = async (req, res) => {
    try {

        const orders = await Order.find().populate('products.product');
        const totalOrders = await Order.countDocuments();

        totalRevenue = orders.reduce((acc, currentValue) => acc + currentValue.totalAmount, 0);

        const checkOrderEmpty = orders.length > 0 ? 'Get All Orders' : 'Order is empty'
        res.status(200).json(
            {
                message: checkOrderEmpty,
                success: true,
                orders,
                totalOrders,
                totalRevenue
            }
        )


    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};


// order cancelled only user 
const updateOrderOnlyAdmin = async (req, res) => {
    try {

        const { orderId } = req.params;
        if (!orderId) {
            return res.status(400).json({
                message: "Please provide orderId",
                success: false
            })
        };


        const updateOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                orderStatus: req.body.orderStatus,
            },

            {
                new: true
            }
        );

        if (!updateOrder) {
            return res.status(404).json({
                message: "Order not found",
                success: false
            })
        }

        res.status(200).json({
            message: "Successfully order order status updated!",
            success: true,
        })

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
}


module.exports = {
    createOrder,
    getUserOrders,
    cancelledOrder,
    getAdminOrders,
    updateOrderOnlyAdmin,
    deleteSingleOrder,
    getSingleOrder
}


