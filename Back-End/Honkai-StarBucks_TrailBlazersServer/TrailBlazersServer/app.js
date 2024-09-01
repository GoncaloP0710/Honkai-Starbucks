const express = require('express');
const app = express();
app.use(express.json());
const { StarRail } = require('starrail.js');

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const con_string = "mongodb+srv://goncalopinto07102003:Y24OQFKGUftnYECB@cluster0.wxmwzsu.mongodb.net/TrailBlazerDB?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(con_string);

const client = new StarRail();
client.cachedAssetsManager.cacheDirectoryPath = "node_modules/starrail.js/cache";
client.cachedAssetsManager.cacheDirectorySetup();

client.cachedAssetsManager.activateAutoCacheUpdater({
    instant: true, // Run the first update check immediately
    timeout: 60 * 60 * 1000, // 1 hour interval
    onUpdateStart: async () => {
        console.log("Updating Star Rail Data...");
    },
    onUpdateEnd: async () => {
        client.cachedAssetsManager.refreshAllData(); // Refresh memory
        console.log("Updating Completed!");
    }
});

mongoose.connection.on('connected', async function() {
    console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', function(err) {
    console.error('Failed to connect to MongoDB:', err);
});

const teamRouter = require('./routes/Team');
app.use('/team', teamRouter);
const trailBlazerRouter = require('./routes/TrailBlazer');
app.use('/trailBlazer', trailBlazerRouter);

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`TrailBlazersServer is running on port ${PORT}`);
});