class GCPStorage {
    constructor(){
        this._name = 'google';
    }

    upload(){
        console.log('File uploading to GCP storage');
    }

    read(){
        console.log('File read from GCP storage');
    }

    delete(){
        console.log('File deleting from GCP storage');
    }
}

export default GCPStorage;