const express = require('express');
// const sockjs = require('sockjs');
const { StarRail } = require('starrail.js');
const app = express();
// const sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};

const client = new StarRail();
client.cachedAssetsManager.cacheDirectoryPath = "node_modules/starrail.js/cache";
client.cachedAssetsManager.cacheDirectorySetup();

client.cachedAssetsManager.activateAutoCacheUpdater({
    instant: true, // Run the first update check immediately
    timeout: 60 * 60 * 1000, // 1 hour interval
    onUpdateStart: async () => {
        console.log("Updating Star Rail Data...");
    },
    onUpdateEnd: async () => {
        client.cachedAssetsManager.refreshAllData(); // Refresh memory
        console.log("Updating Completed!");
    }
});

const loginRouter = require('./routes/Login');
app.use('/login', loginRouter);
const characterRouter = require('./routes/Character');
app.use('/characters', characterRouter);


// app.get('/characters/:uid', async (req, res) => {
//     try {
//         const uid = req.params.uid;

//         // Fetch user data based on UID
//         const userData = await client.fetchUser(uid);

//         const supportCharacters = userData.supportCharacters;
//         const starfaringCompanions = userData.starfaringCompanions;
//         const allCharacters = [...supportCharacters, ...starfaringCompanions];

//         const characters = []; // Define characters array
//         for (const character of allCharacters) {
//             // Fetch character data based on character ID
//             const characterData = character.characterData;
//             const name = characterData.name;
//             console.log(name.getAsFormattedText());

//             // Create a new object with only the properties you need
//             const simplifiedCharacterData = {
//                 name: name.getAsFormattedText().text,
//                 relics: character.relics.map(relic => ({
//                     level: relic.level,
//                     name: relic.relicData.name.getAsFormattedText(),
//                     mainStat: {
//                         stat: relic.mainStat.mainStatData.statProperty.nameRelic.getAsFormattedText(),
//                         value: relic.mainStat.value
//                     },
//                     subStats: relic.subStats.map((subStat, index) => ({
//                         stat: subStat.statProperty.nameRelic.getAsFormattedText(),
//                         value: relic.subStats[index].value
//                     }))
//                 })),

//             };
//             for (const relic of simplifiedCharacterData.relics) {
//                 console.log(relic.mainStat_Value);
//                 // console.log(relic.subStats);
//                 // console.log(relic.level);
//                 // console.log(relic.set);
//             }

//             characters.push(simplifiedCharacterData); // Push the simplified object into the characters array
//         }

//         // Respond with characters info
//         res.json(characters);
//     } catch (error) {
//         console.error('Error retrieving characters info:', error);

//         // Send a more detailed error response including the error message
//         res.status(500).json({ error: 'Internal server error', message: error.message });
//     }
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
