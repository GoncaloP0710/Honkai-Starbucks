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

            // Create a new object with only the properties you need
            const simplifiedCharacterData = {
                name: name.getAsFormattedText().text,
                relics: character.relics.map(relic => ({
                    level: relic.level,
                    name: relic.relicData.name.getAsFormattedText(),
                    mainStat: {
                        stat: relic.mainStat.mainStatData.statProperty.nameRelic.getAsFormattedText(),
                        value: relic.mainStat.value
                    },
                    subStats: relic.subStats.map((subStat, index) => ({
                        stat: subStat.statProperty.nameRelic.getAsFormattedText(),
                        value: relic.subStats[index].value
                    }))
                })),

            };
            for (const relic of simplifiedCharacterData.relics) {
                console.log(relic.mainStat_Value);
                // console.log(relic.subStats);
                // console.log(relic.level);
                // console.log(relic.set);
            }

            characters.push(simplifiedCharacterData); // Push the simplified object into the characters array
        }

        // Respond with characters info
        res.json(characters);
    } catch (error) {
        console.error('Error retrieving characters info:', error);

        // Send a more detailed error response including the error message
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});