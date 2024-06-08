const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const DatabaseService = require('./databaseService');

const app = express();
const server = http.createServer(app);  // Create the server
const io = socketIo(server);

const databaseService = new DatabaseService();
databaseService.init();

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
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
