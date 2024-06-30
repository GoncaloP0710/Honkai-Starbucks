const asyncHandler = require("express-async-handler");
const axios = require('axios');

exports.getCaharactersWithUid = asyncHandler(async (req, res, next) => {
    console.log("Getting characters data...");
    const {uid} = req.body;
    console.log(uid);

    const uidS = new URLSearchParams(uid).toString();
    const response = await axios.get(`http://localhost:9000/trailBlazer/uid/?${uidS}`);
    return res.json(response.data.message);
});