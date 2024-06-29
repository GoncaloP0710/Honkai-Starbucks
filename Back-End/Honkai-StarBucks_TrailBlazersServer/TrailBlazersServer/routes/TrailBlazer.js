const express = require('express');
const router = express.Router();
const trailBlazerController = require('../controller/TrailBlazerController');

router.get('/uid/', trailBlazerController.getCaharactersWithUID);

module.exports = router;