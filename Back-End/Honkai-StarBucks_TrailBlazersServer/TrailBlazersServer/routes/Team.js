const express = require('express');
const router = express.Router();
const teamController = require('../controller/TeamChontroller');

router.post('/createTeam', teamController.createTeam);

module.exports = router;