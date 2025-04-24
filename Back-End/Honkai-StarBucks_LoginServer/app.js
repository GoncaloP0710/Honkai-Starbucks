const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const con_string = "mongodb+srv://goncalopinto07102003:Y24OQFKGUftnYECB@cluster0.wxmwzsu.mongodb.net/LoginDB?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(con_string);

mongoose.connection.on('connected', async function() {
    console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', function(err) {
    console.error('Failed to connect to MongoDB:', err);
});

const loginRouter = require('./routes/Login');
app.use('/login', loginRouter);

const registerRouter = require('./routes/Register');
app.use('/register', registerRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});