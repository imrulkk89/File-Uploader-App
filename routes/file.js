const express = require('express');
const router = express.Router();
const FileController = require('../controllers/FileController');
const storageProvider = require('../services/FileService');

const fileController = new FileController(storageProvider());

/* Root Routing */
router.get('/', function(req, res, next) {
  res.send({greetings: "HelloWorld"});
});

router.post('/file', fileController.upload);

module.exports = router;
