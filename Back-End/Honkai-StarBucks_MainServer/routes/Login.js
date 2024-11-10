const express = require('express');
const router = express.Router();
const loginController = require('../controller/LoginController');

router.post('/', loginController.login);
router.post('/register', loginController.register);

module.exports = router;