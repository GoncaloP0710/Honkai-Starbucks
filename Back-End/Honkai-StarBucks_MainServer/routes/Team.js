const express = require('express');
const router = express.Router();
const teamController = require('../controller/TeamController');

router.post('/createTeam', teamController.createTeam);

module.exports = router;