import CryptoJS from 'crypto-js'
const iv = '8080109070348081'
const key = 'PAXs4Napx7yMSC71'
/**
 * Utility that provides functions for encrypting and decrypting using the CryptoJS API
 */
class SecurityUtil {  
    /**
     * Reverse a string
     */
    static reverse(data) {
        return data.split("").reverse().join("");
    }

    /**
     * Parse string to utf8
     * @param {string} data Data
     */
    static parseUtf8(data){
        return CryptoJS.enc.Utf8.parse(data);
    }
    /**
     * Decrypt data
     * @param {string} data Data to decrypt
     */
    static decr(data) {
        const initialVector = this.reverse(iv)
        const passPhrase = this.reverse(key)
        const decryptedValue = CryptoJS.AES.decrypt(
            data,
            passPhrase, {
                keySize: 128 / 8,
                iv: initialVector,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        return decryptedValue.toString(CryptoJS.enc.Utf8);
    }

    /**
     * Encrypt data
     * @param {string} data Data to encrypt
     */
    static encr(data){      
        var passPhrase = CryptoJS.lib.WordArray.create(this.reverse(key));
        var initialVector = CryptoJS.lib.WordArray.create(this.reverse(iv));        
        const parsedData = data
        const encryptedValue = CryptoJS.AES.encrypt(
            parsedData,
            passPhrase, {
                keySize: 128 / 8,
                iv: initialVector,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        return encryptedValue.toString();
    }
}

export default SecurityUtil