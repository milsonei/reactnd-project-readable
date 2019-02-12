import myaxios from './myaxios'
/**
 * Abstract Base api class
 */
class BaseApi {
    url = ""
    constructor(url) {
        if (this.constructor === BaseApi) {
            throw new TypeError('Abstract class "BaseApi" cannot be instantiated directly.');
        }
        this.url = url;
    }
   
    resolvePromise(promise, onSucessRequest, onErrorRequest){
        if (onSucessRequest && onErrorRequest){
            return promise.then(res => onSucessRequest(res.data)).catch(e => onErrorRequest(e.message));
        }

        if (onSucessRequest){
            return promise.then(res => onSucessRequest(res.data));
        }

        if (onErrorRequest){
            return promise.catch(e => onErrorRequest(e.message));
        }

        return promise;
    }
    /**
     * Send a get command to a especific server
     * @param {string} url url to send a get command
     * @param {function} onSucessRequest function executed on success request
     * @param {function} onErrorRequest function executed on error request
     */
    getRequest = (url, onSucessRequest, onErrorRequest) => this.resolvePromise(myaxios.get(url), onSucessRequest, onErrorRequest)

    /**
     * Send a put command to a especific server
     * @param {string} url url to send a put command
     * @param {any} data data to send
     * @param {function} onSucessRequest function executed on success request
     * @param {function} onErrorRequest function executed on error request
     */
    putRequest = (url, data, onSucessRequest, onErrorRequest) => this.resolvePromise(myaxios.put(url, data), onSucessRequest, onErrorRequest)

    /**
     * Send a delete command to a especific server
     * @param {string} url url to send a delete command
     * @param {function} onSucessRequest function executed on success request
     * @param {function} onErrorRequest function executed on error request
     */
    deleteRequest = (url, onSucessRequest, onErrorRequest) => this.resolvePromise(myaxios.delete(url), onSucessRequest, onErrorRequest)

    /**
     * Send a post command to a especific server
     * @param {string} url url to send a post command
     * @param {any} data data to send
     * @param {function} onSucessRequest function executed on success request
     * @param {function} onErrorRequest function executed on error request
     */
    postRequest = (url, data, onSucessRequest, onErrorRequest) => this.resolvePromise(myaxios.post(url, data), onSucessRequest, onErrorRequest)

    /**
     * Send a put command to a especific server
     * @param {string} url url to send a post command
     * @param {any} data data to send
     * @param {function} onSucessRequest function executed on success request
     * @param {function} onErrorRequest function executed on error request
     */
    putRequest = (url, data, onSucessRequest, onErrorRequest) => this.resolvePromise(myaxios.put(url, data), onSucessRequest, onErrorRequest)
}

export default BaseApi