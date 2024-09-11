const asyncHandler = require("express-async-handler");
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

exports.createTeam = async (req, res) => {
    const { team } = req.body;

    // Validate the input
    if (!Array.isArray(team) || team.length > 4 || team.length < 1) {
        return res.status(400).json({ error: 'Input must be an array of up to 4 numbers.' });
    }

    try {
        const response = await axios.post('http://localhost:9000/team/createTeam', { team });
        return res.json(response.data.message);
    } catch (error) {
        console.error('Error creating team:', error);
        return res.status(500).json({ error: 'Failed to create team' });
    }
};