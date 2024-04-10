const { createMailTransporter } = require("./createMailTransporter");

const sendVerificationMail = (user) => {
    const transporter = createMailTransporter();

    // Construct the verification link based on your application's route
    const verificationLink = `https://aeonaxy-frontend.onrender.com/verify?emailToken=${user.emailToken}`;

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

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Verification email sent successfully");
                resolve();
            }
        });
    });
};

module.exports = { sendVerificationMail };