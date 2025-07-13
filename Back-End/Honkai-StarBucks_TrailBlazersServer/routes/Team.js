const express = require('express');
const router = express.Router();
const teamController = require('../controller/TeamChontroller');

router.post('/createTeam', teamController.createTeam);
router.get('/username', teamController.getTeamsWithUsername);
router.delete('/id', teamController.deleteTeam);
router.get('/id', teamController.getTeamById);

module.exports = router;