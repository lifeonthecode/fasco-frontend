const User = require("../models/User");
const cloudinary = require('../utils/cloudinary'); // Adjust the path as necessary
const bcryptjs = require('bcryptjs');
const generateToken = require("../utils/jwt");
const sendEmail = require("../utils/sendEmail");


const getUserSingle = async (req, res) => {
    try {
        const user = await User.findById({_id: req.user._id}).select('-password -resetOtp');

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        res.status(200).json(
            {
                message: 'User found successfully',
                success: true,
                user
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

const getAllUsers = async (req, res) => {
    try {

        const users = await User.find(
            { role: { $ne: 'admin' } } // Exclude admin users
        ).select('-password -resetOtp');
        if (!users || users.length === 0) {
            return res.status(404).json({
                message: 'No users found',
                success: false
            });
        }

        res.status(200).json(
            {
                message: 'Users found successfully',
                success: true,
                users
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

const userRegister = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json(
                {
                    message: 'All Fields required please',
                    success: false
                }
            )
        }

        const user = await User.findOne({ email });
        // exists check user 
        if (user) {
            return res.status(404).json(
                {
                    message: 'User Already exists Please Login',
                    success: false
                }
            )
        };

        const hashPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        await newUser.save();

        const token = await generateToken(newUser._id, '1d');

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.status(202).json({
            message: 'User Created success',
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};

const userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json(
                {
                    message: 'All Fields required please',
                    success: false
                }
            )
        }

        // check user is exists 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json(
                {
                    message: 'User not found!',
                    success: false
                }
            )
        }

        const matchPassword = await bcryptjs.compare(password, user.password);
        if (!matchPassword) {
            return res.status(403).json(
                {
                    message: 'Invalid Password',
                    success: false
                }
            )
        };

        const token = await generateToken(user._id, '7d');

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 7 * 60 * 60 * 1000 // 7 day
        })

        res.status(200).json({
            message: 'User successfully logged',
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



const userLogout = async (req, res) => {
    try {

        res.clearCookie('access_token', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            expires: new Date(0)
        });

        res.status(200).json({
            message: 'User successfully logged out',    
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};



const uploadUserProfile = async (req, res) => {
    try {


        const { id } = req.params;
        const { path, filename } = req.file;
        if (!id) {
            return res.status(400).json(
                {
                    message: 'Please provide user Id',
                    success: false
                }
            )
        };



        const user = await User.findByIdAndUpdate(id, {
            avatar: {
                url: path,
                public_id: filename
            }
        });
        if (!user) {
            return res.status(404).json(
                {
                    message: 'User not found',
                    success: false
                }
            )
        }

        res.status(200).json(
            {
                message: 'Profile image uploaded successfully',
                success: true,
                avatar: {
                    url: user.avatar.url,
                    public_id: user.avatar.public_id
                }
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



// only use admin panel 
const userDelete = async (req, res) => {
    try {
        const { id, public_id } = req.params;

        if (!id) {
            return res.status(400).json(
                {
                    message: 'Please provide user Id',
                    success: false
                }
            )
        }

        // cloudinary for deleting image 
        await cloudinary.uploader.destroy(public_id);

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json(
                {
                    message: 'User not found',
                    success: false
                }
            )
        }

        res.status(200).json(
            {
                message: 'Successfully user deleted',
                success: true
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


const forgetPassword = async (req, res) => {
    try {

        const { email } = req.body;
        if (!email) {
            return res.status(400).json(
                {
                    message: 'Email is required',
                    success: false
                }
            )
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json(
                {
                    message: 'User not found with this email!',
                    success: false
                }
            )
        };


        // create otp 
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit otp
        user.resetOtp = otp;
        await user.save();
        // Send the OTP to the user's email

        await sendEmail(
            {
                to: user.email,
                subject: 'Password Reset OTP',
                text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
            }
        );


        res.status(200).json({
            message: 'Otp sent to your email',
            success: true,
            otp: otp, // For testing purposes, remove in production
            userId: user._id // For further processing, like confirming OTP
        });


    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};

const confirmOtpCode = async (req, res) => {
    try {
        const { id } = req.params;
        const { otp } = req.body;


        if (!email || !otp) {
            return res.status(400).json(
                {
                    message: 'Email and OTP are required',
                    success: false
                }
            )
        };


        const user = await User.findOne({ _id: id, resetOtp: otp });
        if (!user) {
            return res.status(404).json(
                {
                    message: 'Invalid OTP or Email',
                    success: false
                }
            )
        };

        res.status(200).json({
            message: 'OTP confirmed successfully',
            success: true,
            userId: user._id // For further processing, like resetting password
        });

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};

const userNewPassword = async (req, res) => {
    try {
        const { newPassword, otp } = req.body;
        const { id} = req.params;

        if (!newPassword || !otp) {
            return res.status(400).json(
                {
                    message: 'New password and User ID are required',
                    success: false
                }
            )
        };

        const user = await User.findOne({
            _id: id,
            resetOtp: otp
        });
        if (!user) {
            return res.status(404).json(
                {
                    message: 'User not found',
                    success: false
                }
            )
        };

        const hashPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashPassword;
        user.resetOtp = null; // Clear the OTP after password reset



        await user.save();

        // Successful password reset email
        await sendEmail(
            {
                to: user.email,
                subject: 'Successful Password Reset',
                text: `Your password has been successfully reset. If you did not request this change, please contact support immediately.`
            }
        );

        res.status(200).json({
            message: 'Password reset successfully',
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};


const resendOtpCode = async (req, res) => {
    try {

        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json(
                {
                    message: 'User ID is required',
                    success: false
                }
            )
        };

        const user = await User.findById({_id: userId});
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        };

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit otp
        user.resetOtp = otp;



        await user.save();
        // Send the new OTP to the user's email
        await sendEmail(
            {
                to: user.email,
                subject: 'New OTP sent to your email',
                text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
            }
        );

        res.status(200).json({
            message: 'New OTP sent to your email',
            success: true,
            otp: otp, // For testing purposes, remove in production
            userId: user._id // For further processing, like confirming OTP
        });

    } catch (error) {
        return res.status(500).json({
            message: 'server side error',
            error: error.message,
            success: false
        });
    }
};




module.exports = {
    userRegister,
    userLogin,
    userLogout,
    userDelete,
    forgetPassword,
    confirmOtpCode,
    userNewPassword,
    resendOtpCode,
    uploadUserProfile,
    getUserSingle,
    getAllUsers
}