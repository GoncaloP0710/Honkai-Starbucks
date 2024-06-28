const asyncHandler = require("express-async-handler");
const axios = require('axios');
const User = require('../models/User');
const node2fa = require('node-2fa');
const nodemailer = require('nodemailer');

exports.login = asyncHandler(async (req, res, next) => {
    console.log("Logging in...");
    const { username, password } = req.query;
    console.log(username);

    try {
        console.log("Finding user...");

        const user = await User.findOne({ username: username }).exec();
        console.log(user);
        if (user.password !== password) {
            return res.json({ message: "Password invalid" });
        }

        return res.json({ message: "User loged in successfully" });

    } catch {
        return res.json({ message: "User does not exists" });
    }

});
