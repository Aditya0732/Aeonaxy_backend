const nodemailer = require("nodemailer");

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        service:"hotmail",
        auth:{
            user:"adityaaeonaxy@outlook.com",
            pass:"Aditya0732."
        },
    });

    return transporter;
}

module.exports = {createMailTransporter};