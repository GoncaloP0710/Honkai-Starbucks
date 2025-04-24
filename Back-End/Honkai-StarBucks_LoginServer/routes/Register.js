const express = require('express');
const router = express.Router();
const registerController = require('../controller/RegisterController');

router.post('/', registerController.register);

module.exports = router;