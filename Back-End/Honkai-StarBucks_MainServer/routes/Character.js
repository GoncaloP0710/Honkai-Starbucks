const express = require('express');
const router = express.Router();
const characterController = require('../controller/CharacterController');

router.post('/uid', characterController.getCaharactersWithUid);

module.exports = router;