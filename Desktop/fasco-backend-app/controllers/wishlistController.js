const Wishlist = require("../models/Wishlist");


const addWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        }

        let wishlist = await Wishlist.findOne({ user: userId });

        if (wishlist) {
            const productExists = wishlist.products.some(p => p.toString() === productId);

            if (productExists) {
                return res.status(400).json({
                    message: 'Product already exists in wishlist',
                    success: false
                });
            }

            wishlist.products.push(productId);
            await wishlist.save();
        } else {
            wishlist = new Wishlist({
                user: userId,
                products: [productId]
            });
            await wishlist.save();
        }

        res.status(200).json({
            message: 'Product added to wishlist successfully',
            success: true,
            wishlist
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server side error',
            error: error.message,
            success: false
        });
    }
};



const getWishlists = async (req, res) => {
    try {

        if (!req.params.userId) {
            return res.status(400).json({
                message: 'Please provide userId',
                success: false
            })
        }

        const wishlist = await Wishlist.findOne({
            user: req.params.userId
        }).populate('products');

        const totalWishlistItems = await Wishlist.countDocuments({
            user: req.params.userId
        });

        if (!wishlist) {
            return res.status(404).json({
                message: 'Wishlist not found',
                success: false
            })
        };
        res.status(200).json({
            message: 'Successfully get wishlists',
            success: true,
            wishlist,
            totalWishlistItems
        })


    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};


const deleteSingleWishlist = async (req, res) => {
    try {

        const { userId, productId } = req.params;

        if (!userId || !productId) {
            return res.status(400).json({
                message: 'Please provide userId and productId',
                success: false
            })
        }
        
        const wishlist = await Wishlist.findOneAndDelete(
            {user: userId},
            {$pull: {products: productId}},
            {new: true}
        );

        if (!wishlist) {
            return res.status(404).json({
                message: 'Wishlist not found',
                success: false
            })
        }

        res.status(200).json({
            message: 'Successfully wishlist deleted',
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

const deleteAllWishlist = async (req, res) => {
    try {

        const {userId} = req.params;
        if(!userId) {
            return res.status(400).json({
                message: 'Please provide userId',
                success: false
            })
        };

        const deleteAllWishlist = await Wishlist.findByIdAndDelete({user: userId});
        if(!deleteAllWishlist) {
            return res.status(404).json({
                message: 'Wishlist not found',
                success: false
            })
        }

        res.status(200).json({
            message: 'Successfully all wishlist deleted',
            success: true,
            wishlist: deleteAllWishlist
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
    addWishlist,
    getWishlists,
    deleteSingleWishlist,
    deleteAllWishlist
}