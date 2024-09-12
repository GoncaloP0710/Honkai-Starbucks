const asyncHandler = require("express-async-handler");
const MoC = require('../models/MoC');
const mongoose = require("mongoose");

const fs = require('fs');
const path = require('path'); // Import the path module


exports.init = asyncHandler(async (req, res, next) => {
    await populateDb();
    res.send('MoC DATABASE POPULATED');
});

async function populateDb() {
    await deleteDb();
    await createMoC();
}

async function deleteDb() {
    const collection = mongoose.connection.collections['mocs'];
    if (collection) {
        await collection.drop();
        console.log('MoC collection dropped');
    } else {
        console.log('MoC collection does not exist');
    }
}

async function createMoC() {
    const mocFolderPath = path.join(__dirname, "../MoCInfo_Json");

    try {
        const files = await fs.promises.readdir(mocFolderPath);

        for (const file of files) {
            const filePath = path.join(mocFolderPath, file);
            console.log(`Processing file: ${filePath}`);
            mocCreate(file);
        }
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

async function mocCreate(file) {
    console.log(`Creating MoC: ${file}`);
}