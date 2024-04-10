const jwt = require('jsonwebtoken');
const User = require('../models/user');
const crypto = require('crypto');

const generateAccessToken = (user) => {
    return jwt.sign({ userId: user._id }, "secretpassword", { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    try {
        return jwt.sign({ userId: user._id }, "secretpassword2", { expiresIn: '1d' });
    } catch (error) {
        console.log("Error here", error);
    }

};

exports.signup = async (req, res) => {
    try {
        const { email, name, userName, password, terms } = req.body;
        const existingEmailUser = await User.findOne({ email });
        const existingUserNameUser = await User.findOne({ userName });
        if (existingEmailUser) {
            return res.status(409).json({ message: 'Email is already registered' });
        }
        if (existingUserNameUser) {
            return res.status(409).json({ message: 'Username is already taken' });
        }

        // Create a new user
        const newUser = await User.create({ email, name, userName, password, terms, emailToken:crypto.randomBytes(64).toString("hex") });
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);
        newUser.refreshToken = refreshToken;
        const result = await newUser.save();

        // Set refresh token as HTTP cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ message: 'User created successfully', user: newUser, accessToken: accessToken });
    } catch (error) {
        // Handle any unexpected errors
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.verifyEmail = async(req,res) => {
    try{
        const emailToken = req.body.emailToken;
        console.log(req.body);
        if(!emailToken) return res.status(404).json("Email token is required...");

        const user = await User.findOne({ emailToken: emailToken});

        if(user){
            user.emailToken = null;
            user.isVerified = true;

            await user.save();

            res.status(200).json({user:user});
        }else{
            res.status(404).json("Email verification failed, invalid token");
        }
    }catch (error) {
        console.log("Error while verifying email :",error);
        res.status(500).json(error.message);
    }
};