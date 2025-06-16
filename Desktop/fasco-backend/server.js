const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const cartRouter = require('./routes/cartRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');
const orderRouter = require('./routes/orderRoutes');
const paymentRouter = require('./routes/paymentRoutes');




const app = express();
// middlewares 
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // you can multiple domain. in side array
    credentials: true
}))
app.use(cookieParser());

// just test api create 
app.get('/', (req, res) => {
    res.send({
        message: 'server is running'
    })
})

// APPLICATION ROUTES 
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/wishlist', wishlistRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const PORT  = process.env.PORT || 3000;
app.listen(PORT, async() => {

    await connectDB()
    console.log(`Server is running this port:${PORT} || URL: http://localhost:${PORT}`)
})


