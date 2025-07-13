const express = require('express');
const router = express.Router();
const damageController = require('../controller/DamageController');

router.get('/testTeamDamage', damageController.testTeamDamage);

module.exports = router;