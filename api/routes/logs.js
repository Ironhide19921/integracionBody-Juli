var express = require('express');
var router = express.Router();
const logsController = require('../controllers/logsController');

router.get('/files/:type', logsController.listFiles);
router.get('/file/:name', logsController.getFile);

module.exports = router;
