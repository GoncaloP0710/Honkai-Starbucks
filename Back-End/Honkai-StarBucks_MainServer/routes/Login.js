const express = require('express');
const router = express.Router();
const loginController = require('../controller/LoginController');

router.get('/', loginController.login);
router.post('/register', loginController.register);

module.exports = router;