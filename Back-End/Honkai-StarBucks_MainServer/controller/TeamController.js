const asyncHandler = require("express-async-handler");
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

exports.createTeam = async (req, res) => {
    const { username, name, team } = req.body; // Extract the fields directly from the request body

    // Validate the input
    if (!Array.isArray(team) || team.length > 4 || team.length < 1) {
        return res.status(400).json({ error: 'Input must be an array of up to 4 numbers.' });
    }

    const payload = {
        username: username,
        name: name,
        team: team
    };

    try {
        const response = await axios.post('http://localhost:9000/team/createTeam', payload);
        return res.json(response.data.message);
    } catch (error) {
        console.error('Error creating team:', error);
        return res.status(500).json({ error: 'Failed to create team' });
    }
};

exports.getTeamsWithUsername = async (req, res) => {
    const { username } = req.query;

    try {
        const response = await axios.get(`http://localhost:9000/team/username?username=${username}`);
        return res.json(response.data);
    } catch (error) {
        console.error('Error getting teams:', error);
        return res.status(500).json({ error: 'Failed to get teams' });
    }
}

exports.deleteTeam = async (req, res) => {
    const { id } = req.query;

    try {
        const response = await axios.delete(`http://localhost:9000/team?id=${id}`);
        return res.json(response.data.message);
    } catch (error) {
        console.error('Error deleting team:', error);
        return res.status(500).json({ error: 'Failed to delete team' });
    }
}