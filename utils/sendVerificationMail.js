const {createMailTransporter} = require("./createMailTransporter");

const sendVerificationMail = async (user) => {
    const transporter = createMailTransporter();

    // Construct the verification link based on your application's route
    const verificationLink = `https://aeonaxy-frontend.onrender.com/verify?emailToken=${user.emailToken}`;

    await new Promise((resolve, reject) => {
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    const mailOptions = {
        from: '"Aditya Aeonaxy Assignment" <aeonaxyaditya@outlook.com>',
        to: user.email,
        subject: "Verify your email",
        html: `
            <p>Hello ${user.userName},</p>
            <p>Thank you for signing up with Aditya Aeonaxy Assignment. Please click the following link to verify your email:</p>
            <a href="${verificationLink}">${verificationLink}</a>
            <p>If you didn't request this, you can safely ignore this email.</p>
        `,
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("mailoptions",mailOptions);
                console.error(err);
                reject(err);
            } else {
                console.log("mailoptions",mailOptions);
                console.log(info);
                resolve(info);
            }
        });
    });
    
    res.status(200).json({ status: "OK" });
};

module.exports = { sendVerificationMail };
