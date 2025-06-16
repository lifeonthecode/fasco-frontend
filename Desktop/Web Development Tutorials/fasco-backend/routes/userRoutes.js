const  express = require('express');
const { userLogin, userRegister, userLogout , uploadUserProfile, userDelete, forgetPassword, confirmOtpCode, userNewPassword, resendOtpCode, getUserSingle,getAllUsers} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const adminMiddleware = require('../middlewares/adminMiddleware');

const userRouter = express.Router();


// user get single user route
userRouter.get('/get-user',  authMiddleware, getUserSingle);

// get users by admin route
userRouter.get('/get-users',  authMiddleware, adminMiddleware, getAllUsers);

// user register route 
userRouter.post('/register',  userRegister);

// user login route 
userRouter.post('/login',  userLogin);

// user profile route 
userRouter.post('/logout', authMiddleware, userLogout);

// user profile route 
userRouter.post('/upload-profile/:id', authMiddleware, upload.single('avatar'), uploadUserProfile);

// user delete route. delete user by admin
userRouter.post('/user-delete/:id/:public_id', authMiddleware, adminMiddleware ,userDelete);

// user password forget route
userRouter.post('/forget-password', forgetPassword);


// user confirm otp code route
userRouter.post('/confirm-otp-code/:id', confirmOtpCode);

// user new password route
userRouter.post('/new-password/:id', userNewPassword);

// user resend otp code route
userRouter.post('/resend-otp-code/:userId', resendOtpCode);



module.exports = userRouter;