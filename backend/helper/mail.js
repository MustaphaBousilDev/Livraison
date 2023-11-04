require('dotenv').config()
const nodemailer = require("nodemailer");
async function sendMails(mailOptions){
    try {
        
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable SSL certificate validation
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user:'erik21@ethereal.email',
                pass: '6MN7QJuSV7rAVpDuVX'
            }
        });
        // define email options
        let details = await transporter.sendMail(mailOptions);

    } catch (error) {
        return error;
    }
}

module.exports = sendMails;