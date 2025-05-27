const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');




const app = express();
// middlewares 
app.use(express.json())
app.use(cors())
app.use(cookieParser());

// just test api create 
app.get('/', (req, res) => {
    res.send({
        message: 'server is running'
    })
})

// APPLICATION ROUTES 
app.use('/api/v1/user', userRouter)



const PORT  = process.env.PORT || 3000;
app.listen(PORT, async() => {

    await connectDB()
    console.log(`Server is running this port:${PORT} || URL: http://localhost:${PORT}`)
})
