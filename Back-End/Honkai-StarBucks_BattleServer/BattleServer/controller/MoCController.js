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

    function processEnemies(enemies, halfArray, firstWaveArray, secondWaveArray) {
        enemies.forEach(enemy => {
            halfArray.forEach(halfEnemy => {
                if (halfEnemy.name === enemy.name) {
                    if (enemy.wave === 1) {
                        firstWaveArray.push(halfEnemy);
                    } else if (enemy.wave === 2) {
                        secondWaveArray.push(halfEnemy);
                    } else {
                        console.log('Enemy wave not recognized');
                    }
                }
            });
        });
    }
    
    enemies.forEach(enemy => {
        if (enemy.half === 1) {
            processEnemies([enemy], firstHalf, firstHalfFirstWave, firstHalfSecondWave);
        } else {
            processEnemies([enemy], secondHalf, secondHalfFirstWave, secondHalfSecondWave);
        }
    });

    return { firstHalfFirstWave, firstHalfSecondWave, secondHalfFirstWave, secondHalfSecondWave };
}

module.exports = {mocDefaultDBCreate};