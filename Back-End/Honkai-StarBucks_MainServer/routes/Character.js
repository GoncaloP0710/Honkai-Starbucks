const express = require('express');
const router = express.Router();
const characterController = require('../controller/CharacterController');

router.get('/', characterController.getCaharacters);

module.exports = router;