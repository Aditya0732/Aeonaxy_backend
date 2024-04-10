const nodemailer = require("nodemailer");

const createMailTransporter = () => {
    console.log("reached in createtrans");
    const transporter = nodemailer.createTransport({
        service:"hotmail",
        tls:true,
        secure:false,
        auth:{
            user:"aeonaxyaditya2@outlook.com",
            pass:"Aditya0732."
        },
    });

    return transporter;
}

module.exports = {createMailTransporter};