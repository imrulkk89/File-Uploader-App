class CloudStorage {
    constructor(){}

    upload(){
        console.log('File uploading to cloud storage');
    }

    read(){
        console.log('File read from cloud storage');
    }

    delete(){
        console.log('File deleting from cloud storage');
    }
}

module.exports = CloudStorage;