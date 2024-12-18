const asyncHandler = require("express-async-handler");
const Team = require("../models/Team");
const TrailBlazer = require("../models/TrailBlazer");

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

exports.createTeam = asyncHandler(async (req, res, next) => {
    const { username, name, team } = req.body; // Extract the fields directly from the request body
    console.log("Creating team:", req.body);

    // Validate the input
    if (!Array.isArray(team) || team.length > 4 || team.length < 1) {
        return res.status(400).json({ error: 'Input must be an array of up to 4 numbers.' });
    }

    const teamMembers = await TrailBlazer.find({ _id: { $in: team } });
    const teamData = {
        username: username,
        name: name,
        trailBlazers: teamMembers.map(member => member._id)
    };
    
    const teamDB = new Team(teamData);
    
    try {
        await teamDB.save();
        console.log('Team saved successfully');
    } catch (err) {
        console.error('Error saving Team:', err);
    }

    res.json();
});