
const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    resetOtp: {
        type: String,
    },

}, 
{ 
    timestamps: true 

});

const User = model('User', userSchema);
module.exports = User