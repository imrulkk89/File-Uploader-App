class LocalStorage {
    constructor(){}

    upload(){
        console.log('File uploading to local storage');
    }

    read(){
        console.log('File read from local storage');
    }

    delete(){
        console.log('File deleting from local storage');
    }

}

module.exports = LocalStorage;