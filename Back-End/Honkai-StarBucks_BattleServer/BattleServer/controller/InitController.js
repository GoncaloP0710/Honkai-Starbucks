const asyncHandler = require("express-async-handler");
const MoC = require('../models/MoC');
const mongoose = require("mongoose");

exports.init = asyncHandler(async (req, res, next) => {
    await populateDb();
    res.send('MoC DATABASE POPULATED');
});

async function populateDb() {
    await deleteDb();
    await createMoC();
}

async function deleteDb() {
    mongoose.connection.collections['MoC'].drop();
}

async function createMoC() {
    
}

async function mocCreate(name) {
    
}