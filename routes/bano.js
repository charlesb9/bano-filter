const express = require('express');
const router = express.Router();
const banoCtrl = require('../controllers/bano');

router.get('/:filter/', banoCtrl.getBan);
module.exports = router;
