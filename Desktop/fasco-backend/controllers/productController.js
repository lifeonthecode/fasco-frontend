const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");

const createProduct = async (req, res) => {
    try {

        const { originalPrice, discount, } = req.body;

        // Parse JSON fields
        req.body.colors = JSON.parse(req.body.colors);
        req.body.deals = JSON.parse(req.body.deals);
        req.body.star = Number(req.body.star);

        if (!req.files && req.files.length > 0) {
            return res.status(400).json({
                message: 'Pleaser image required',
                success: false
            })
        }
        const images = req.files.map(file => ({
            url: file.path,
            public_id: file.filename
        }))
        req.body.images = images





        // Calculate discount price
        const discountAmount = (Number(originalPrice) * Number(discount)) / 100;
        req.body.discountPrice = Number(Math.round(Number(originalPrice) - discountAmount));
        // const discountPrice = Number(Math.round(Number(originalPrice) - discountAmount));
        // if (!isNaN(originalPrice) && !isNaN(discount)) {
        //     const discountAmount = (Number(originalPrice) * Number(discount)) / 100;
        //     req.body.discountPrice = Math.round(Number(originalPrice) - discountAmount);
        // }


        const newProduct = new Product(
            req.body
        );


        await newProduct.save();
        res.status(202).json({
            message: 'Product Created Success',
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


const getAllProducts = async (req, res) => {
    try {

        const {
            search,
            brands,
            colors,
            sizes,
            prices,
            sort,
            page = 1,
            limit = 6
        } = req.query;

        // console.log(req.query)






        const query = {};
        // console.log(query)

        // product searching query 
        if (search) {
            query.$or = [
                {
                    name: { $regex: search, $options: 'i' }
                },
                {
                    description: { $regex: search, $options: 'i' }
                },

            ]
        }

        // product filtering 

        const selectedSizes = JSON.parse(sizes);

        // console.log(selectedSizes, 'sizes');
        if (selectedSizes.length > 0) {
            query.$or = selectedSizes.map(s => ({
                size: {
                    $regex: `^${s}$`,
                    $options: 'i'
                }
            }));
        }




        // console.log('sizes: array: ', querySizes);
        // console.log('query: ', query)

        // if (colors) {

        //     let queryColors = colors.split(',')
        //     queryColors = queryColors.map(trs => trs.trim());

        //     if (queryColors?.length > 0) query.colors = {
        //         $in: queryColors?.map(col => (
        //             {
        //                 $regex: `^${col}$`,
        //                 $options: 'i'
        //             }
        //         ))
        //     };
        // }
        // console.log('colors: ', colors)

        const selectedColors = JSON.parse(colors)
        if (selectedColors?.length > 0) {
            query.$or = selectedColors.map(col => (
                {
                    colors: {
                        $regex: `^#${col}$`,
                        $options: 'i',
                    }
                }
            ))
        };

        let pricesRange = JSON.parse(prices);
        // console.log('prices type: ', pricesRange);

        if (pricesRange.length > 0) {
            // query.discountPrice = {};
            query.$or = pricesRange.map(range => (
                {
                    discountPrice: {
                        $gte: range.minPrice,
                        $lte: range.maxPrice,
                    }
                }
            ))

        }

        // brand query 
        // if (brand) query.brand = brands;
        const selectedBrands = JSON.parse(brands)
        if (selectedBrands.length > 0) {
            query.$or = selectedBrands.map(b => ({
                brand: {
                    $regex: `^${b}$`,
                    $options: 'i'
                }
            }));
        }



        // if (minPrice || maxPrice) {
        //     query.discountPrice = {};
        //     if (minPrice) query.discountPrice.$gte = Number(minPrice)
        //     if (maxPrice) query.discountPrice.$lte = Number(maxPrice)
        // };


        // console.log('sizes: ', query.sizes)
        // console.log('colors: ', query.colors)
        // console.log('price: ', query.discountPrice)
        // console.log('brand: ', query.brand)



        // Pagination 

        // page skip formula ( (Number(page) -1) * Number(limit) );
        const skip = (Number(page) - 1) * Number(limit);

        // console.log('check')


        let sortOptions = { createdAt: -1 };
        if (sort === 'priceAsc') sortOptions = { discountPrice: 1 };
        if (sort === 'priceDesc') sortOptions = { discountPrice: -1 };
        if (sort === 'star') sortOptions = { star: -1 };



        // query run 
        const products = await Product.find(query).skip(skip).limit(Number(limit)).sort(sortOptions);
        const totalProducts = await Product.countDocuments(query);

        res.status(200).json({
            message: 'Successfully send product to client',
            success: true,
            page: Number(page),
            pages: Math.ceil(totalProducts / limit),
            products
        })

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
}


// admin get all products 
const getByAdminAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({createdAt: -1});
        const totalProducts = await Product.countDocuments();

        res.status(200).json({
            message: 'Successfully send product to client',
            success: true,
            products,
            totalProducts
        })

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
}



const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Please provide product ID',
                success: false
            })
        }

        const product = await Product.findById({ _id: id });
        if (!product) {
            return res.status(400).json({
                message: 'Product not found!',
                success: false
            })
        }

        res.status(200).json({
            message: 'Successfully get product by id',
            success: true,
            product
        })

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
}

const updateProduct = async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Please provide product ID',
                success: false
            })
        };


        // console.log('check now', req.body)
        // Parse JSON fields
        req.body.colors = JSON.parse(req.body.colors);
        req.body.deals = JSON.parse(req.body.deals);

        const product = await Product.findById(id);
        if (product.images) {

            if (req.files && req.files.length > 0) {
                for (let image of product.images) {
                    await cloudinary.uploader.destroy(image.public_id)
                }
            }
        }
        if (!req.files && req.files.length === 0) {
            return res.status(400).json(
                {
                    message: "Please images provide",
                    success: false
                }
            )
        }


        const images = req.files.map(file => ({
            url: file.path,
            public_id: file.filename
        }))
        req.body.images = images;


        const discountAmount = Number(req.body.originalPrice * req.body.discount) / 100;
        const discountPrice = Number(Math.round(Number(req.body.originalPrice - discountAmount)));

        req.body.discountPrice = discountPrice

        const updatedProduct = await Product.findByIdAndUpdate({ _id: id }, req.body, { new: true });

        res.status(200).json({
            message: "Product updated successfully",
            success: true,
            product: updatedProduct
        });

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
}

const getBestSellers = async (req, res) => {
    try {


        const bestSellers = await Product.find({ isBestSeller: true }).sort({ sold: -1 });
        res.status(200).json(
            {
                message: 'Best Seller Products',
                success: true,
                products: bestSellers
            }
        )

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });

    }
}

const getDealsProduct = async (req, res) => {
    try {

        const now = new Date();

        await Product.updateMany(
            {
                "deals.isDeals": true,
                "deals.dealsEndDate": { $lt: now }
            },
            {
                $set: {
                    'deals.isDeals': false,
                    'deals.dealsEndDate': now
                }
            }
        )

        const dealsProducts = await Product.find({
            "deals.isDeals": true,
            "deals.dealsEndDate": { $gte: now }
        }).sort({ 'deals.dealsEndDate': 1 });


        res.status(200).json(
            {
                message: 'Ongoing deals product',
                success: true,
                products: dealsProducts
            }
        )

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });

    }
}

const getNewArrivals = async (req, res) => {
    try {

        const { category } = req.query;

        // If category is provided, filter by category
        const query = {};
        if (category) {
            query.category = category;
        }
        query.createdAt = { $gte: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) }; // Last 20 days

        // const twentyDaysAgo = new Date();
        // twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

        const newArrivals = await Product.find(query).sort({ createdAt: -1 });

        res.status(200).json(
            {
                message: "New arrival products from last 20 days",
                success: true,
                products: newArrivals
            }
        )

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });

    }
}

const accessoriesProducts = async (req, res) => {
    try {

        const { category} = req.query;
        // If category is provided, filter by category
        const query = {};
        if (category) {
            query.category = category;
        }
        const accessories = await Product.find(query).sort({ createdAt: -1 });

        res.status(200).json(
            {
                message: "New arrival products from last 20 days",
                success: true,
                products: accessories,
            }
        )

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });

    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Please provide product ID',
                success: false
            })
        };

        // Step 1: Find the product
        const product = await Product.findById(id);

        // Step 2: Delete all images from Cloudinary
        if (product.images && product.images.length > 0) {
            for (const image of product.images) {
                await cloudinary.uploader.destroy(image.public_id)
            }
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            product: deletedProduct
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
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    getBestSellers,
    getDealsProduct,
    getNewArrivals,
    deleteProduct,
    getByAdminAllProducts,
    accessoriesProducts
}