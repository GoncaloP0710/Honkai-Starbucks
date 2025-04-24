const asyncHandler = require("express-async-handler");
const axios = require('axios');
const User = require('../models/User');
const argon2 = require('argon2');

exports.register = asyncHandler(async (req, res, next) => {
    console.log("Registering...");
    const { username, password } = req.body;

    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
        return res.json({ message: "User already exists" });
    }

    const hash = await argon2.hash(password);

    const newUser = new User({
        username,
        password: hash,
    });

    await newUser.save();
    return res.json({ message: "User registered successfully" });
});