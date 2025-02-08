const express = require('express');
const router = express.Router();
const teamController = require('../controller/TeamChontroller');

router.post('/createTeam', teamController.createTeam);
router.get('/username', teamController.getTeamsWithUsername);

module.exports = router;