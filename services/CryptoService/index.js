const crypto = require('crypto');

class CryptoService{
    constructor(length){
        this._length = length || 60;
        this._diffHell = crypto.createDiffieHellman(this._length);
    }

    generateKeys = () => {
        this._diffHell.generateKeys('hex');
        const publicKey = this._diffHell.getPublicKey('hex');
        const privateKey = this._diffHell.getPrivateKey('hex');

        return {publicKey, privateKey};
    }

}

module.exports = CryptoService;