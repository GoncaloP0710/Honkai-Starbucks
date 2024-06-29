const express = require('express');
const router = express.Router();
const characterController = require('../controller/CharacterController');

router.get('/uid', characterController.getCaharactersWithUid);

module.exports = router;