const express = require('express');
const router = express.Router();
const loginController = require('../controller/LoginController');

router.get('/', loginController.login);

module.exports = router;