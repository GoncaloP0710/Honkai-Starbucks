const express = require('express');
const router = express.Router();
const teamController = require('../controller/TeamChontroller');

router.get('/createTeam/', teamController.createTeam);

module.exports = router;