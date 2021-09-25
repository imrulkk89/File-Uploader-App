const { Storage } = require('@google-cloud/storage');
const got = require('got');

const dotEnv = require('dotenv');
dotEnv.config();

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY
    }
});

class GCPStorage {
    constructor(){
        this._name = 'google';
        this._bucket = storage.bucket(process.env.GCS_BUCKET);
        this._bucket_url = `https://storage.googleapis.com/${process.env.GCS_BUCKET}`;
    }

    async upload(file){                
        
        const uploadFileToGCStorage = (file) => {
            return new Promise((resolve, reject) => {
                const { newfilename } = file;
                const blob = this._bucket.file(newfilename);
                const blobStream = blob.createWriteStream();

                blobStream.on('error', error => {
                    reject(error);
                });

                blobStream.on('finish', () => {
                    resolve(true);
                });

                blobStream.end(file.buffer);
            });
        }

        try {            
            await uploadFileToGCStorage(file);           
        } catch (error) {
            console.error(error);
            throw error;
        }        
    }

    read(fileName){
        try {                                                                                        
            return got.stream(`${this._bucket_url}/${fileName}`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async delete(fileName){
        try {
            await storage.bucket(process.env.GCS_BUCKET).file(fileName).delete();            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = GCPStorage;