require('dotenv').config()
const nodemailer = require("nodemailer");
async function sendMails(mailOptions){
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable SSL certificate validation
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user:'nick72@ethereal.email',
                pass: 'N5ttX8s3wN5DJzZtCN'
            }
        });
        // define email options
        let details = await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = sendMails;