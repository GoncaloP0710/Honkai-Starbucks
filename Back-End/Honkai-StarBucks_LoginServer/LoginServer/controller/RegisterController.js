const asyncHandler = require("express-async-handler");
const axios = require('axios');
const User = require('../models/User');

exports.register = asyncHandler(async (req, res, next) => {
    console.log("Registering...");
    const { username, email, password } = req.body;

    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
        return res.json({ message: "User already exists" });
    }

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
        return res.json({ message: "Email already exists" });
    }

    const newUser = new User({
        username,
        email,
        password
    });

    await newUser.save();
    return res.json({ message: "User registered successfully" });
});