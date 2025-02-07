const asyncHandler = require("express-async-handler");
const axios = require('axios');

exports.getCaharactersWithUid = asyncHandler(async (req, res, next) => {
    console.log("Getting characters data...");
    const {uid} = req.body;
    const {username} = req.body;
    console.log(uid);
    console.log(username);

    const response = await axios.post('http://localhost:9000/trailBlazer/uid', {
        uid: uid,
        username: username
      });    
    return res.json(response.data);
});