const express = require('express');
const router = express.Router();
const trailBlazerController = require('../controller/TrailBlazerController');

router.post('/uid/', trailBlazerController.getCaharactersWithUID);
router.get('/userName', trailBlazerController.getCaharactersWithUserName);

module.exports = router;