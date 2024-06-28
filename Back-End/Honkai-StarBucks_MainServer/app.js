const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(express.json());
const { StarRail } = require('starrail.js');
const server = http.createServer(app);  // Create the server
const io = socketIo(server);

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

const loginRouter = require('./routes/Login');
app.use('/login', loginRouter);
const characterRouter = require('./routes/Character');
app.use('/characters', characterRouter);

io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // Handle messages from the client
    socket.on('message', (data) => {
        console.log('Message from client:', data);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
