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
    
    async upload(file){
      return await this._strategy.upload(file);    
    }

    read(fileName){
      return this._strategy.read(fileName);
    }

    async delete(fileName){
      return await this._strategy.delete(fileName);
    }

}

module.exports = FileManager;