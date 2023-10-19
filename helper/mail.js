require('dotenv').config()
const nodemailer = require("nodemailer");
async function sendMails(mailOptions){
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable SSL certificate validation
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user:'nash.littel22@ethereal.email',
                pass: 'F2n7WNGe8mRzNyvzVG'
            }
        });
        // define email options
        let details = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", details.messageId);

    } catch (error) {
        
        console.log(error);
        return error;
    }
}

module.exports = sendMails;