const nodemailer = require("nodemailer");

const createMailTransporter = () => {
    console.log("reached in createtrans");
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'greyson.carter@ethereal.email',
            pass: '1CnR9s9J58BX2DJJEw'
        }
    });

    return transporter;
}

module.exports = {createMailTransporter};