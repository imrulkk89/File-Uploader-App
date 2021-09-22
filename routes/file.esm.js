import express from 'express';
import  fileUpload  from '../middlewares/fileUploader.esm.js';
//import FileController from '../controllers/FileController.esm.js';
import { fileController } from '../services/index.esm.js';

const router = express.Router();

/* Root Routing */
router.get('/', function(req, res, next) {
  res.send({greetings: "HelloWorld"});
});

router.post('/files', fileUpload.single('any-file') , fileController.upload); 
router.get('/files/:publicKey', fileController.read);
router.delete('/files/:privateKey', fileController.delete);

export default router;
