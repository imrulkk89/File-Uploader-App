import express from 'express';
import FileController from '../controllers/FileController.esm.js';

const router = express.Router();

/* Root Routing */
router.get('/', function(req, res, next) {
  res.send({greetings: "HelloWorld"});
});

router.post('/file', FileController.upload); 

export default router;
