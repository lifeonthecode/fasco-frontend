
const adminMiddleware = (req, res, next) => {
    try {
        // Check if the user is an admin
        if (req.user && req.user.role === 'admin') {
            next(); // User is admin, proceed to the next middleware or route handler
        } else {
            return res.status(403).json({
                message: 'Forbidden, you do not have permission to access this resource',
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
            success: false
        });
    }
};

module.exports = adminMiddleware;
// This middleware checks if the user has admin privileges before allowing access to certain routes.