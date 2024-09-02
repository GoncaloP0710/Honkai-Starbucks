const asyncHandler = require("express-async-handler");
const Team = require("../models/Team");
const TrailBlazer = require("../models/TrailBlazer");

exports.createTeam = asyncHandler(async (req, res, next) => {
    const { team } = req.body; // Extract the 'team' array from the request body
    console.log("Creating team:", team);

    // Validate the input
    if (!Array.isArray(team) || team.length > 4 || !team.every(num => typeof num === 'number')) {
        return res.status(400).json({ error: 'Input must be an array of up to 4 numbers.' });
    }

    const teamMembers = await TrailBlazer.find({ uid: { $in: team } });
    

    res.json();
});