class FileManager{
    constructor(){
        this._strategy  = null;
    }

    set strategy(strategy){
        this._strategy = strategy;
    }

    get strategy(){
        return this._strategy;
    }
    
    upload(file){
        this._strategy.upload(file);    
    }

    read(){
        this._strategy.read();
    }

    delete(){
        this._strategy.delete();
    }

}

export default FileManager;