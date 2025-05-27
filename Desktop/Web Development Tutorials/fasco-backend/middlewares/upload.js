const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');



const storage =  new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'FascoEcommerce', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
    },
})


const upload = multer({ storage });
module.exports = upload;
// This middleware uses multer with Cloudinary storage to handle file uploads.
