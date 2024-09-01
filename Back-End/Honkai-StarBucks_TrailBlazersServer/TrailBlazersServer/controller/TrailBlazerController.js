const asyncHandler = require("express-async-handler");
const { StarRail } = require("starrail.js");
const client = new StarRail();
const TrailBlazer = require("../models/TrailBlazer");

const { sumStats } = require('../node_modules/starrail.js/dist/models/character/CharacterStats');

exports.getCaharactersWithUID = asyncHandler(async (req, res, next) => {
    console.log("Getting characters data...");

    const uid = Object.keys(req.query)[0];
    console.log(uid);

    // Fetch user data based on UID
    const starRailUser = await client.fetchUser(uid);
    console.log("data fetched!");

    debugger; // Execution will pause here if running in a debugger

    const supportCharacters = starRailUser.supportCharacters;
    const starfaringCompanions = starRailUser.starfaringCompanions;
    const allCharacters = [...supportCharacters, ...starfaringCompanions];
    
    for (const character of allCharacters) {
        // Fetch character data based on character ID
        const characterData = character.characterData;
        
        const name = characterData.name.toString();
        console.log(name);

        const type = characterData.combatType.id;
        console.log(type);

        const pathId = characterData.path.id;
        const pathName = getPathCounterpart(pathId);
        console.log(pathName);

        const eidolons = character.eidolons;
        console.log("number of eidolons: " + eidolons);

        const lightConeInfo = {
            name: character.lightCone.lightConeData.name.toString(),
            level: character.lightCone.level,
            superimposition: character.lightCone.superimposition.level
        }
        console.log(lightConeInfo.name + " " + lightConeInfo.level + " " + lightConeInfo.superimposition);

        const relicsInfo = character.relics.map(relic => ({
            level: relic.level,
            set: relic.relicData.name.getAsFormattedText(),
            mainStat: {
                stat: relic.mainStat.mainStatData.statProperty.nameRelic.getAsFormattedText(),
                value: relic.mainStat.value
            },
            subStats: relic.subStats.map((subStat, index) => ({
                stat: subStat.statProperty.nameRelic.getAsFormattedText(),
                value: relic.subStats[index].value
            }))
        }))
        // console.log(relicsInfo);

        const stats = sumStats(character.stats.overallStats.getAll(), client);
        const transformedStats = transformStats(stats);
        // console.log(transformedStats);

        transformedStats.forEach(stat => {
            const { type, isPercent, value } = stat;
            if (type.startsWith('Base')) {
              baseStats[type] = value;
            } else if (type.endsWith('Delta')) {
              addedStats[type] = value;
            } else if (isPercent) {
              multipliersStats[type] = value;
            }
        });

        console.log("====================================");
    }

    // Respond with characters info
    res.json();
});

// Mapping of the API´s name to pathName
const pathMap = {
    "Warrior": "Destruction",
    "Rogue": "The Hunt",
    "Mage": "Erudition",
    "Shaman": "Harmony",
    "Warlock": "Nihility",
    "Knight": "Preservation",
    "Priest": "Abundance",
    "Unknown": "General"
};

function getPathCounterpart(pathId) {
    return pathMap[pathId] || "Invalid pathId";
}

function transformStats(stats) {
    // Convert the object values to an array before mapping
    return Object.values(stats).map(stat => ({
        type: stat.type,
        isPercent: stat.isPercent,
        value: stat.value
    }));
}

function calculateEndStat(base, delta, addedRatio) {
    return base + delta + (base * addedRatio);
}