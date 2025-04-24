const asyncHandler = require("express-async-handler");
const Enemy = require('../models/Enemy');
const mongoose = require("mongoose");

const fs = require('fs').promises;
const path = require('path'); // Import the path module

/**
 * Returns two arrays of enemies based on the MoC Version passed (ex: 2.6v1), one for each wave
 * 
 * @param {*} mocVersion 
 */
async function enemysDefaultCreateWithFolder(mocVersion) {
    const firstHalf = [];
    const secondHalf = [];
    const folderPath = path.join(__dirname, `../EnemyInfo_Json/MoC/${mocVersion}`);

    const firstHalfPath = path.join(folderPath, 'firstHalf');
    const secondHalfPath = path.join(folderPath, 'secondHalf');

    // Process files in the firstHalf folder
    const firstHalfFiles = await fs.readdir(firstHalfPath);
    for (const file of firstHalfFiles) {
        console.log("Processing file:" + file);
        const filePath = path.join(firstHalfPath, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const enemyData = JSON.parse(fileContent); // Parse the JSON content
        firstHalf.push(await enemyDefaultCreateWithJson(enemyData));
    }

    // Process files in the secondHalf folder
    const secondHalfFiles = await fs.readdir(secondHalfPath);
    for (const file of secondHalfFiles) {
        const filePath = path.join(secondHalfPath, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const enemyData = JSON.parse(fileContent); // Parse the JSON content
        secondHalf.push(await enemyDefaultCreateWithJson(enemyData));
    }

    return { firstHalf, secondHalf };
}

async function enemyDefaultCreateWithJson(enemy) {

    const enemyData = {
        name: enemy.name,
        enemyId: enemy.enemyId,
        level: enemy.level,
        health: enemy.health,
        phases: enemy.phases,
        defense: enemy.defense,
        speed: enemy.speed,
        paths: enemy.paths,
        statusResistance: enemy.statusResistance,
        statusProbability: enemy.statusProbability,
        imagePath: enemy.imagePath,
    };
    
    const enemyS = new Enemy(enemyData);
    
    try {
        await enemyS.save();
        console.log('Enemy saved successfully:' + enemy.name);
        return enemyS;
    } catch (err) {
        console.error('Error saving Enemy:', err);
        return null;
    }
}

module.exports = {enemysDefaultCreateWithFolder,};