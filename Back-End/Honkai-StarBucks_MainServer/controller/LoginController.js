const asyncHandler = require("express-async-handler");
const axios = require('axios');

exports.login = asyncHandler(async (req, res, next) => {
    console.log("Logging in...");
    const { username, password } = req.body;
    console.log(username);

    const params = new URLSearchParams({ username, password }).toString();
    const response = await axios.get(`http://localhost:5000/login/?${params}`);
    return res.json(response.data.message);
});

exports.register = asyncHandler(async (req, res, next) => {
    console.log("Registering...");
    const { username, email, password } = req.body;
    const response = await axios.post(`http://localhost:5000/register/`, {
        username,
        email,
        password
    });
    return res.json(response.data.message);
});