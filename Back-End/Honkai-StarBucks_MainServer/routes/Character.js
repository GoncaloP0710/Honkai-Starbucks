const express = require('express');
const router = express.Router();
const characterController = require('../controller/CharacterController');

router.post('/uid', characterController.getCaharactersWithUid);
router.get('/username', characterController.getCaharactersWithUsername);
router.delete('/:id/:username', characterController.removeCharacter);

module.exports = router;