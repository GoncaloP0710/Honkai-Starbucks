const asyncHandler = require("express-async-handler");
const MoC = require('../models/MoC');
const Enemy = require('../models/Enemy');
const mongoose = require("mongoose");

const fs = require('fs');
const path = require('path'); // Import the path module

const EnemyController = require('./EnemyController');

/**
 * Creates the default MoC database
 */
async function mocDefaultDBCreate() {
    const mocFolderPath = path.join(__dirname, "../MoCInfo_Json");
    
    try {
        const files = await fs.promises.readdir(mocFolderPath);

        for (const file of files) {
            const filePath = path.join(mocFolderPath, file);
            const fileContent = await fs.promises.readFile(filePath, 'utf-8');
            const mocJson = JSON.parse(fileContent); // Parse the JSON content

            const fileNameWithoutExtension = file.slice(0, -5); // Remove last 5 characters (".json")
            await mocDefaultCreate(mocJson, await EnemyController.enemysDefaultCreateWithFolder(fileNameWithoutExtension));
        }
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

// TODO: Separate this function into smaller functions
async function mocDefaultCreate(mocJson, enemysDefault) {
    const { firstHalfFirstWave, firstHalfSecondWave,
         secondHalfFirstWave, secondHalfSecondWave } = orderEnemysDefault(mocJson, enemysDefault);

    // Process enemies in the firstHalf array
    firstHalf.forEach(enemy => {
        if (enemy.wave === 1) {
            firstHalfFirstWave.push(enemy);
        } else {
            firstHalfSecondWave.push(enemy);
        }
    });

    // Process enemies in the secondHalf array
    secondHalf.forEach(enemy => {
        if (enemy.wave === 1) {
            secondHalfFirstWave.push(enemy);
        } else {
            secondHalfSecondWave.push(enemy);
        }
    });

    const mocData = {
        MOC: mocJson.MOC,
        name: mocJson.name,
        buff: mocJson.buff,
        firstHalf: { 
            firstWave: firstHalfFirstWave,
            secondWave: firstHalfSecondWave,
        },
        secondtHalf: { 
            firstWave: secondHalfFirstWave,
            secondWave: secondHalfSecondWave,
        },
    };

    const moc = new MoC(mocData);
    
    try {
        await moc.save();
        console.log('MoC saved successfully');
    } catch (err) {
        console.error('Error saving MoC:', err);
    }
}

/**
 * 
 * 
 * We make the distinction betwen the first and second half of the enemies in the MoC 
 * because the enemies might have different stats despite being the same enemy.
 * 
 * @param {*} mocJson 
 * @param {*} enemysDefault 
 */
function orderEnemysDefault(mocJson, enemysDefault) {
    const { firstHalf, secondHalf } = enemysDefault;

    const firstHalfFirstWave = [];
    const firstHalfSecondWave = [];
    const secondHalfFirstWave = [];
    const secondHalfSecondWave = [];

    const enemies = mocJson.enemies;

    return { firstHalfFirstWave, firstHalfSecondWave, secondHalfFirstWave, secondHalfSecondWave };
}

module.exports = {mocDefaultDBCreate};