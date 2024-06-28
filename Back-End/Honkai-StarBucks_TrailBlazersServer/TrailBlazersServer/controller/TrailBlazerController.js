const asyncHandler = require("express-async-handler");
const { StarRail } = require("starrail.js");
const client = new StarRail();

exports.getCaharactersWithUID = asyncHandler(async (req, res, next) => {

    const uid = req.params.uid;

    // Fetch user data based on UID
    const starRailUser = await client.fetchUser(uid);

    const supportCharacters = starRailUser.supportCharacters;
    const starfaringCompanions = starRailUser.starfaringCompanions;
    const allCharacters = [...supportCharacters, ...starfaringCompanions];

    const characters = []; // Define characters array
    for (const character of allCharacters) {
        // Fetch character data based on character ID
        const characterData = character.characterData;
        const name = characterData.name;
        console.log(name.getAsFormattedText());

        // Create a new object with only the properties you need
        const simplifiedCharacterData = {name: name.getAsFormattedText().text,};
        characters.push(simplifiedCharacterData); // Push the simplified object into the characters array
    }

    // Respond with characters info
    res.json(characters);
});