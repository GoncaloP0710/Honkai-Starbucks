const express = require('express');
const router = express.Router();
const initController = require('../controller/InitController');

router.post('/', initController.init);

module.exports = router;