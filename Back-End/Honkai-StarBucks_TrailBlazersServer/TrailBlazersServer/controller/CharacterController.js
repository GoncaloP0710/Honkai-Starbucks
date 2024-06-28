const asyncHandler = require("express-async-handler");
const { StarRail } = require("starrail.js");
const cache = require('../cache.js'); // Import shared cache
const client = new StarRail();

exports.getCaharacters = asyncHandler(async (req, res, next) => {

    const uid = cache.get("current id");
    console.log("Fetching characters for uid " + uid);
    const starRailUser = cache.get(uid);

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