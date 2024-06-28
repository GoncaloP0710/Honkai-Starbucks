const express = require('express');
const app = express();
app.use(express.json());
const { StarRail } = require('starrail.js');

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const con_string = "mongodb+srv://goncalopinto07102003:Y24OQFKGUftnYECB@cluster0.wxmwzsu.mongodb.net/TrailBlazerDB?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(con_string);

mongoose.connection.on('connected', async function() {
    console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', function(err) {
    console.error('Failed to connect to MongoDB:', err);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});