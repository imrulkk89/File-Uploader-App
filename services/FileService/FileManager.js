class FileManager{
    constructor(strategy){
        if(strategy)
            this._strategy = strategy;
        else 
            this._strategy  = null;
    }

    set strategy(strategy){
        this._strategy = strategy;
    }

    get strategy(){
        return this._strategy;
    }
    
    upload(){
        this._strategy.upload();    
    }

    read(){
        this._strategy.read();
    }

    delete(){
        this._strategy.delete();
    }

}

module.exports = FileManager;