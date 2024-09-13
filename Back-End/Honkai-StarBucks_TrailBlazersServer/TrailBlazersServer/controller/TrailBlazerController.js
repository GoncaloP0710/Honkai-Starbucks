const asyncHandler = require("express-async-handler");
const { StarRail } = require("starrail.js");
const fs = require('fs');
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

    if (!starRailUser) {
        throw new Error("No user data returned");
    }

    const nickname = starRailUser.nickname;
    const supportCharacters = starRailUser.supportCharacters;
    const starfaringCompanions = starRailUser.starfaringCompanions;
    const allCharacters = [...supportCharacters, ...starfaringCompanions];
    
    for (const character of allCharacters) {
        // Fetch character data based on character ID
        const characterData = character.characterData;
        const name = characterData.name.toString();
        const type = characterData.combatType.id;
        const pathId = characterData.path.id;
        const pathName = getPathCounterpart(pathId);
        const level = character.level;
        const eidolons = character.eidolons;
        const tracesLevel = await getTracesLevel(character)

        const lightConeInfo = getLcInfo(character);
        const relicsInfo = getRelicsInfo(character);

        const stats = sumStats(character.stats.overallStats.getAll(), client);
        const transformedStats = transformStats(stats);
        const { baseStats, addedStats, multipliersStats } = getNonFinalStats(transformedStats);
        const finalStats = getFinalStats(transformedStats, baseStats, addedStats, multipliersStats);

        await createTrailBlazer(nickname, name, type, pathName, level, eidolons, tracesLevel, lightConeInfo, relicsInfo, finalStats, baseStats, addedStats, multipliersStats);
    }

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

function getLcInfo(character) {
    if (character.lightCone==null)
        return null;
    const lightConeInfo = {
        name: character.lightCone.lightConeData.name.toString(),
        level: character.lightCone.level,
        superimposition: character.lightCone.superimposition.level
    }
    return lightConeInfo;
}

function getRelicsInfo(character) {
    const relicsInfo = character.relics.map(relic => ({
        set: relic.relicData.name.getAsFormattedText().text,
        level: relic.level,
        mainStat: {
            name: relic.mainStat.mainStatData.statProperty.nameRelic.getAsFormattedText().text,
            value: relic.mainStat.value
        },
        subStats: relic.subStats.map((subStat, index) => ({
            name: subStat.statProperty.nameRelic.getAsFormattedText().text,
            value: relic.subStats[index].value
        }))
    }))
    return relicsInfo;
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

function getNonFinalStats(transformedStats) {
    const baseStats = {
        BaseHP: -1,
        BaseAttack: -1,
        BaseDefence: -1,
        BaseSpeed: -1,
    };

    const addedStats = {
        HPDelta: 0,
        AttackDelta: 0,
        DefenceDelta: 0,
        SpeedDelta: 0,
    };

    const multipliersStats = {
        HPAddedRatio: 0,
        AttackAddedRatio: 0,
        DefenceAddedRatio: 0,
        SpeedAddedRatio: 0,
    };

    transformedStats.forEach(stat => {
        const { type, isPercent, value } = stat;
        if (type.startsWith('Base')) {
            baseStats[type] = value ;
        } else if (type.endsWith('Delta')) {
            addedStats[type] = value ;
        } else if (multipliersStats.hasOwnProperty(type)) {
            multipliersStats[type] = value ;
        }
    });

    return { baseStats, addedStats, multipliersStats };
}

function getFinalStats(transformedStats, baseStats, addedStats, multipliersStats) {
    const finalStats = {
        FinalHP: -1,
        FinalAttack: -1,
        FinalDefence: -1,
        FinalSpeed: -1,
        FinalSPRatio: -1,
        MaxSP: -1,
        CriticalChanceBase: -1,
        CriticalDamageBase: -1,
        BreakDamageAddedRatioBase: 0,
        HealRatioBase: 0,
        StatusProbabilityBase: 0,
        StatusResistanceBase: 0,
        ThunderAddedRatio: 0,
        FireAddedRatio: 0,
        IceAddedRatio: 0,
        WindAddedRatio: 0,
        QuantomAddedRatio: 0,
        PhysicalAddedRatio: 0,
        ImaginaryAddedRatio: 0,
    };

    transformedStats.forEach(stat => {
        const { type, isPercent, value } = stat;
        if (finalStats.hasOwnProperty(type)) {
            finalStats[type] = value;
        } else if (type === 'SPRatioBase') {
            finalStats.FinalSPRatio = value;
        }
    });

    finalStats.FinalHP = calculateEndStat(baseStats.BaseHP, addedStats.HPDelta, multipliersStats.HPAddedRatio);
    finalStats.FinalAttack = calculateEndStat(baseStats.BaseAttack, addedStats.AttackDelta, multipliersStats.AttackAddedRatio);
    finalStats.FinalDefence = calculateEndStat(baseStats.BaseDefence, addedStats.DefenceDelta, multipliersStats.DefenceAddedRatio);
    finalStats.FinalSpeed = calculateEndStat(baseStats.BaseSpeed, addedStats.SpeedDelta, multipliersStats.SpeedAddedRatio);

    return finalStats;
}

async function createTrailBlazer(nickname, name, type, pathName, level, eidolons, tracesLevel, lightConeInfo, relicsInfo, finalStats, baseStats, addedStats, multipliersStats) {
    const trailblazerData = {
        username: nickname,
        name: name,
        type: type,
        path: pathName,
        level: level,
        eidolon: eidolons,
        tracesLevel: tracesLevel,
        lightCone: lightConeInfo,
        relics: relicsInfo,
        finalStats: finalStats,
        baseStats: baseStats,
        addedStats: addedStats,
        multipliersStats: multipliersStats,
    };
    
    const trailblazer = new TrailBlazer(trailblazerData);
    
    try {
        await trailblazer.save();
        console.log('TrailBlazer saved successfully');
    } catch (err) {
        console.error('Error saving TrailBlazer:', err);
    }
}

async function getTracesLevel(character) {
    const LeveledSkillTreeNode = character.skillTreeNodes;
    const tracesLevelArray = [];
    const bonusAbilityLevelArray = [0,0,0];

    // Iterate through the array and print the level number
    LeveledSkillTreeNode.forEach(node => {
        if (node._data.PointType==2)
            tracesLevelArray.push(node.level.value);
        if (node._data.PointType==3)
            if (node._data.Anchor == "Point06")
                bonusAbilityLevelArray[0] = 1;
            if (node._data.Anchor == "Point07")
                bonusAbilityLevelArray[1] = 1;
            if (node._data.Anchor == "Point08")
                bonusAbilityLevelArray[2] = 1;
            
    });

    const tracesLevel = {
        basic: tracesLevelArray.at(0),
        skill: tracesLevelArray.at(1),
        ultimate: tracesLevelArray.at(2),
        talent: tracesLevelArray.at(3),
        bonusAbility1: bonusAbilityLevelArray[0],
        bonusAbility2: bonusAbilityLevelArray[1],
        bonusAbility3: bonusAbilityLevelArray[2],
    }

    return tracesLevel;
}

// Testado minimamente
function objectToJsonFile(object, filePath) {
    try {
        const jsonString = JSON.stringify(object, null, 2); // Convert object to JSON string with indentation
        fs.writeFileSync(filePath, jsonString, 'utf8'); // Write JSON string to file
        console.log(`Object successfully written to ${filePath}`);
    } catch (error) {
        console.error(`Error writing object to JSON file: ${error}`);
    }
}

// Nao testado
function jsonFileToObject(filePath) {
    try {
        const jsonString = fs.readFileSync(filePath, 'utf8'); // Read JSON file content
        const object = JSON.parse(jsonString); // Parse JSON string to object
        console.log(`JSON file successfully read from ${filePath}`);
        return object;
    } catch (error) {
        console.error(`Error reading JSON file: ${error}`);
        return null;
    }
}