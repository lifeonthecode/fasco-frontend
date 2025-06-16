const Product = require("../models/Product");
const handleUpdateProduct = async (products) => {
    try {
        
        for (const item of products) {
            let product = await Product.findById(item.product);
            if (product.stock < item.quantity) {
                return res.status(202).json({
                    message: `Not enough stock for ${product.name}`,
                    success: false,
                })
            }
            
            // update stock and sold 
            product.stock -= item.quantity;
            product.sold += item.quantity;
    
            
            // mark as best seller if applicable 
            if(product.sold >= 3 && !product.isBestSeller) {
                product.isBestSeller = true
            }
            await product.save();

            console.log(`Updated product: ${product.name}, Stock: ${product.stock}, Sold: ${product.sold}`);
        }
    } catch (error) {
        console.error("Error updating product stock:", error);
        return {
            success: false,
            message: "Failed to update product stock",
            error: error.message
        };
    }
};

module.exports = handleUpdateProduct;