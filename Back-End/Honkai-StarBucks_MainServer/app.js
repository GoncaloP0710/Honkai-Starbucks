const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const loginRouter = require('./routes/Login');
app.use('/login', loginRouter);
const characterRouter = require('./routes/Character');
app.use('/characters', characterRouter);
const teamRouter = require('./routes/Team');
app.use('/team', teamRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
