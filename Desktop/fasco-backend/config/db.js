
const {mongoose} = require('mongoose')

const connectDB = async () => {
    try {

        let mongodbUri = process.env.MONGODB_URI.replace('<db_username>', process.env.MONGODB_APP_NAME).replace('<db_password>', process.env.MONGODB_APP_PASSWORD);

        await mongoose.connect(mongodbUri);
        console.log(`Mongodb successfully connected`)
        
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
};

module.exports = connectDB

