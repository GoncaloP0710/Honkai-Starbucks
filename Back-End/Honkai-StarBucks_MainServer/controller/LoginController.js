const asyncHandler = require("express-async-handler");
const { StarRail } = require("starrail.js");
const cache = require('../cache.js'); // Import shared cache
const client = new StarRail();

exports.login = asyncHandler(async (req, res, next) => {
    console.log("Logging in...");
    const uid = req.params.uid;
    let starRailUser = cache.get(uid);

    if (!starRailUser) {
        console.log("Cashing user data for uid " + uid);
        starRailUser = await client.fetchUser(uid);
        cache.set(uid, starRailUser);
    }

    cache.set("current id", uid);

    console.log("Logged in to uid " + cache.get("current id"));
    res.json("Logged in to uid " + uid);
});