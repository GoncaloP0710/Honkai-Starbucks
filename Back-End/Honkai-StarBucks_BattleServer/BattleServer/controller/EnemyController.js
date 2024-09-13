const asyncHandler = require("express-async-handler");
const Enemy = require('../models/Enemy');
const mongoose = require("mongoose");

const fs = require('fs');
const path = require('path'); // Import the path module

/**
 * Returns two arrays of enemies based on the MoC Version passed (ex: 2.6v1), one for each wave
 * 
 * @param {*} mocVersion 
 */
async function enemysDefaultCreateWithFolder(mocVersion) {
    const firstHalf = [];
    const secondHalf = [];
    const folderPath = path.join(__dirname, `../MoCInfo_Json/MoC/${mocVersion}`);

    const firstHalfPath = path.join(folderPath, 'firstHalf');
    const secondHalfPath = path.join(folderPath, 'secondHalf');

    // Process files in the firstHalf folder
    fs.readdirSync(firstHalfPath).forEach(file => {
        const filePath = path.join(firstHalfPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const enemyData = JSON.parse(fileContent); // Parse the JSON content
        const enemy = enemyDefaultCreateWithJson(enemyData);
        firstHalf.push(enemy);
    });

    // Process files in the secondHalf folder
    fs.readdirSync(secondHalfPath).forEach(file => {
        const filePath = path.join(secondHalfPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const enemyData = JSON.parse(fileContent); // Parse the JSON content
        const enemy = enemyDefaultCreateWithJson(enemyData);
        secondHalf.push(enemy);
    });

    return {firstHalf, secondHalf};
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
        paths: [{
            name: enemy.paths.name,
            percentage: enemy.path.percentage, // Perceber o que o 150 significa
        }],
        statusResistance: enemy.statusResistance,
        statusProbability: enemy.statusProbability,
        imagePath: enemy.imagePath,
    };
    
    const enemy = new Enemy(enemyData);
    
    try {
        await enemy.save();
        console.log('Enemy saved successfully');
        return enemy;
    } catch (err) {
        console.error('Error saving Enemy:', err);
        return null;
    }
}

module.exports = {enemysDefaultCreateWithFolder,};