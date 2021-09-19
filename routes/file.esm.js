import express from 'express';
import  fileUpload  from '../middlewares/fileUploader.esm.js';
import FileController from '../controllers/FileController.esm.js';

const router = express.Router();

/* Root Routing */
router.get('/', function(req, res, next) {
  res.send({greetings: "HelloWorld"});
});

router.post('/files', fileUpload.single('any-file') , FileController.upload); 
router.get('/files/:publicKey', FileController.read);
router.delete('/files/:privateKey', FileController.delete);

export default router;
