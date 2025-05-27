const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {

        const {token} = req.cookies;
        if (!token) {
            return res.status(401).json(
                {
                    message: 'Unauthorized, no token provided',
                    success: false
                }
            );
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        if (!decoded) {
            return res.status(401).json(
                {
                    message: 'Unauthorized, invalid token',
                    success: false
                }
            );
        };


        const user = await User.findById({_id: decoded.id}).select('-password -resetOtp');
        if (!user) {
            return res.status(404).json(
                {
                    message: 'User not found',
                    success: false
                }
            );
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        return res.status(500).json(
            {
                message: 'Server error',
                error: error.message,
                success: false
            }
        );
    }
};


module.exports = authMiddleware;