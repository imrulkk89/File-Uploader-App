class FileController{
    constructor(fileService){
        this._fileService = fileService;
    }

    upload = async (req, res) => {
        this._fileService.upload();
        res.status(200).json({message: "image uploaded"});
    }

    read = async (req, res) => {

    }

    delete = async (req, res) => {

    }
}

module.exports = FileController;