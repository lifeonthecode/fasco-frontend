const jwt = require('jsonwebtoken');

const generateToken = async(id, expiresData) => {
    const token =  jwt.sign({id}, process.env.ACCESS_TOKEN, {
        expiresIn: expiresData
    });

    return token;
};

module.exports = generateToken;