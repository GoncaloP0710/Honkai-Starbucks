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
    const mocFolderPath = path.join(__dirname, "../MoCInfo_Json/MoC");

    try {
        const files = await fs.promises.readdir(mocFolderPath);

        for (const file of files) {
            const { firstHalf, secondHalf } = await EnemyController.enemysDefaultCreateWithFolder(file);
        }
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

async function mocDefaultCreate(mocJson, firstHalf, secondHalf) {
    const firstHalfFirstWave = [];
    const firstHalfSecondWave = [];
    const secondHalfFirstWave = [];
    const secondHalfSecondWave = [];

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
        console.log('Enemy saved successfully');
        return moc;
    } catch (err) {
        console.error('Error saving Enemy:', err);
        return null;
    }
}