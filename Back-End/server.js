const express = require('express');
const { StarRail } = require('starrail.js');

const app = express();
const client = new StarRail();

client.cachedAssetsManager.cacheDirectoryPath = "./cache";
client.cachedAssetsManager.cacheDirectorySetup();

app.get('/characters/:uid', async (req, res) => {
    try {
        const uid = req.params.uid;

        // Fetch user data based on UID
        const userData = await client.fetchUser(uid);

        const supportCharacters = userData.supportCharacters;
        const starfaringCompanions = userData.starfaringCompanions;
        const allCharacters = [...supportCharacters, ...starfaringCompanions];

        const characters = []; // Define characters array
        for (const character of allCharacters) {
            // Fetch character data based on character ID
            const characterData = character.characterData;
            const name = characterData.name;
            console.log(name.getAsFormattedText());
            characters.push(name.getAsFormattedText()); // Push the name into the characters array
        }

        // Respond with characters info
        res.json(characters);
    } catch (error) {
        console.error('Error retrieving characters info:', error);

        // Send a more detailed error response including the error message
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
