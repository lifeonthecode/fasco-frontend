const nodemailer = require('nodemailer');

const sendEmail = async ({to, subject, text}) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email address]
                pass: process.env.EMAIL_PASS // Your email password or app password
            },
        });


        const mailOptions = {
            from: `Welcome from Fasco E-commerce App ${process.env.EMAIL_USER}`, // Sender address
            to: to, // List of recipients
            subject: subject, // Subject line
            text: text, // Plain text body
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId)



    } catch (error) {
        console.log('Error sending email: ', error);
    }
};


module.exports = sendEmail;