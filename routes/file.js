const  express = require('express');
const  { fileUpload }  = require('../middlewares/fileUploader.js');
const  { fileController } = require('../services/index.js');

const router = express.Router();

/* Root Routing */
router.get('/', function(req, res, next) {
  res.send({greetings: "HelloWorld"});
});

router.post('/files', fileUpload.single('any-file') , fileController.upload); 
router.get('/files/:publicKey', fileController.read);
router.delete('/files/:privateKey', fileController.delete);

module.exports = router;
