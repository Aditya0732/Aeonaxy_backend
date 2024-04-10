const nodemailer = require("nodemailer");

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        service:"hotmail",
        auth:{
            user:"aeonaxyaditya@outlook.com",
            pass:"Aditya0732."
        },
    });

    return transporter;
}

module.exports = {createMailTransporter};