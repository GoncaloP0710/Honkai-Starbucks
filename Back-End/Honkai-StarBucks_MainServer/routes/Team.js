const express = require('express');
const router = express.Router();
const teamController = require('../controller/TeamController');

router.post('/createTeam', teamController.createTeam);
router.get('/username', teamController.getTeamsWithUsername);
router.delete('/delete', teamController.deleteTeam);

module.exports = router;