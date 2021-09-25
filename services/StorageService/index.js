class StorageService{
    constructor(){
        this._strategies = [];
    }

    addStrategy(strategy){
        this._strategies = [...this._strategies, strategy];
    }

    getStrategy(name){
        return this._strategies.filter(strategy => strategy._name === name)[0];    
    }
}


module.exports = StorageService;


