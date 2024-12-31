const asyncHandler = require("express-async-handler");
const axios = require('axios');

exports.getCaharactersWithUid = asyncHandler(async (req, res, next) => {
    console.log("Getting characters data...");
    const {uid} = req.body;
    const {username} = req.body;
    console.log(uid);
    console.log(username);

    const uidS = new URLSearchParams(uid).toString();
    const usernameS = new URLSearchParams(username).toString();
    const response = await axios.get(`http://localhost:9000/trailBlazer/uid/?${uidS}&${usernameS}`);
    return res.json(response.data.message);
});