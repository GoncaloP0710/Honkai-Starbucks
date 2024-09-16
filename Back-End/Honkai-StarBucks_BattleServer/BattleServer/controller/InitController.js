const asyncHandler = require("express-async-handler");
const MoC = require('../models/MoC');
const mongoose = require("mongoose");

const fs = require('fs');
const path = require('path'); // Import the path module

const MoCController = require('./MoCController');

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
    const collection2 = mongoose.connection.collections['enemies'];

    if (collection) {
        await collection.drop();
        console.log('MoC collection dropped');
    } else {
        console.log('MoC collection does not exist');
    }

    if (collection2) {
        await collection2.drop();
        console.log('Enemies collection dropped');
    } else {
        console.log('Enemies collection does not exist');
    }
}

async function createMoC() {
    await MoCController.mocDefaultDBCreate();
}