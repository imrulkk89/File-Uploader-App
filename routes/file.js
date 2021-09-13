var express = require('express');
var router = express.Router();

/* Root Routing */
router.get('/', function(req, res, next) {
  res.send({greetings: "HelloWorld"});
});

module.exports = router;
