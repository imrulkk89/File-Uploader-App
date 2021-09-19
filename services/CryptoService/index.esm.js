import crypto from 'crypto';

class CryptoService{
    constructor(length){
        this._length = length || 60;
        this._diffHell = crypto.createDiffieHellman(this._length);
    }

    generateKeys = () => {
        this._diffHell.generateKeys('base64');
        const publicKey = this._diffHell.getPublicKey('base64');
        const privateKey = this._diffHell.getPrivateKey('base64');

        return {publicKey, privateKey};
    }

}

export default CryptoService;