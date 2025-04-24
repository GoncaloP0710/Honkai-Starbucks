const asyncHandler = require("express-async-handler");
const axios = require('axios');
const User = require('../models/User');
const node2fa = require('node-2fa');
const nodemailer = require('nodemailer');
const argon2 = require('argon2');

exports.login = asyncHandler(async (req, res, next) => {
    console.log("Logging in...");
    const { username, password } = req.query;
    console.log(username);

    try {

        console.log(username);
        console.log(password);

        console.log("Finding user...");

        const user = await User.findOne({ username: username }).exec();
        console.log(user);

        if (user === null) {
            return res.json({ message: "User does not exists" });
        }

        // Verify the provided password against the stored hash
        if (await argon2.verify(user.password, password)) {
            console.log("Password verified");
            return res.json({ message: "User loged in successfully" });
        }

        console.log("Password verification failed");
        return res.json({ message: "Password invalid" });

    } catch (error) {
        console.log("Error during login:", error);
        return res.json({ message: "An error occurred during login" });
    }
});
