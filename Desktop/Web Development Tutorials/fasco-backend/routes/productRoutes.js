const express = require('express');
const adminMiddleware = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/upload');
const { createProduct, getAllProducts, getSingleProduct, updateProduct, getBestSellers, getDealsProduct, getNewArrivals, deleteProduct, getByAdminAllProducts, accessoriesProducts } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const productRoutes = express.Router();




/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               brand:
 *                 type: string
 *               originalPrice:
 *                 type: number
 *               discount:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 */


// Create product (admin only)
productRoutes.post('/create-product', authMiddleware, adminMiddleware, upload.array('images',9), createProduct);


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products with optional filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [priceAsc, priceDesc, rating]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of products
 */



// Read all products (public or protected based on use-case)
productRoutes.get('/products', getAllProducts);
// get by admin panel 
productRoutes.get('/admin/products', authMiddleware,adminMiddleware, getByAdminAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get single product by ID (requires auth)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single product details
 */
// Read single product
productRoutes.get('/product/:id', authMiddleware, getSingleProduct);


/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product (Admin only)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated
 */

// Update product (admin only)
productRoutes.put('/update-product/:id', authMiddleware, adminMiddleware, upload.array('images',6), updateProduct);


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */

// Delete product (admin only)
productRoutes.delete('/delete-product/:id', authMiddleware, adminMiddleware, deleteProduct);

/**
 * @swagger
 * /products/best-sellers:
 *   get:
 *     summary: Get best seller products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of best sellers
 */

// Special categories
productRoutes.get('/best-seller/products', getBestSellers);

/**
 * @swagger
 * /products/deals:
 *   get:
 *     summary: Get deal products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of deal products
 */
productRoutes.get('/products/deals', getDealsProduct);

/**
 * @swagger
 * /products/new-arrivals:
 *   get:
 *     summary: Get newly arrived products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of new arrivals
 */
productRoutes.get('/products/new-arrivals', getNewArrivals);

productRoutes.get('/products/accessories', accessoriesProducts);



module.exports = productRoutes;