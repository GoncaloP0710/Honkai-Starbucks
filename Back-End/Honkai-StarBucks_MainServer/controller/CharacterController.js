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

exports.getCaharactersWithUsername = asyncHandler(async (req, res, next) => {
    // Extract username from query parameters
    const { username } = req.query;
    console.log(`Username: ${username}`);

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    // Send request to TrailBlazersServer
    try {
        // Make a request to the external service to get characters data
        const response = await axios.get(`http://localhost:9000/trailBlazer/userName`, {
            params: { username }
        });

        // Send the response data back to the client
        return res.json(response.data);
    } catch (error) {
        console.error('Error fetching characters data:', error);
        return res.status(500).json({ message: 'Error fetching characters data' });
    }
});

exports.removeCharacter = asyncHandler(async (req, res, next) => {
    const { id, username } = req.params;
    console.log(`Removing character with id ${id} for user ${username}`);

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        // Make a request to the external service to remove the character
        const response = await axios.delete(`http://localhost:9000/trailBlazer/${id}/${username}`);

        // Send the response data back to the client
        return res.json(response.data);
    } catch (error) {
        console.error('Error removing character:', error);
        return res.status(500).json({ message: 'Error removing character' });
    }
});