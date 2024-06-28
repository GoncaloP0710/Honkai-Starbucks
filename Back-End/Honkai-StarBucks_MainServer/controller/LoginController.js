const asyncHandler = require("express-async-handler");
const { StarRail } = require("starrail.js");
const cache = require('../cache.js'); // Import shared cache
const client = new StarRail();
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

// Caching the uid of the player
// exports.login = asyncHandler(async (req, res, next) => {
//     console.log("Logging in...");
//     const uid = req.params.uid;
//     let starRailUser = cache.get(uid);

//     if (!starRailUser) {
//         console.log("Cashing user data for uid " + uid);
//         starRailUser = await client.fetchUser(uid);
//         cache.set(uid, starRailUser);
//     }

//     cache.set("current id", uid);

//     console.log("Logged in to uid " + cache.get("current id"));
//     res.json("Logged in to uid " + uid);
// });