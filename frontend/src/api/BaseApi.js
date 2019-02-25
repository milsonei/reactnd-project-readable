import myaxios from './myaxios'
/**
 * Api base class that sends web requests to the remote data server using Promise based HTTP client for the browser and node.js called AXIOS.
 */
class BaseApi {
    url = ""
    constructor(url) {
        if (this.constructor === BaseApi) {
            throw new TypeError('Abstract class "BaseApi" cannot be instantiated directly.');
        }
        this.url = url;
    }
   
    resolvePromise(promise, onSuccessRequest, onErrorRequest){
        if (onSuccessRequest && onErrorRequest){
            return promise.then(res => onSuccessRequest(res.data)).catch(e => onErrorRequest(e.message));
        }

        if (onSuccessRequest){
            return promise.then(res => onSuccessRequest(res.data));
        }

        if (onErrorRequest){
            return promise.catch(e => onErrorRequest(e.message));
        }

        return promise;
    }
    /**
     * Send a get command to a especific server
     * @param {string} url url to send a get command
     * @param {function} onSuccessRequest function executed on success request
     * @param {function} onErrorRequest function executed on error request
     */
    getRequest = (url, onSuccessRequest, onErrorRequest) => this.resolvePromise(myaxios.get(url), onSuccessRequest, onErrorRequest)

    /**
     * Send a put command to a especific server
     * @param {string} url url to send a put command
     * @param {any} data data to send
     * @param {function} onSuccessRequest function executed on success request
     * @param {function} onErrorRequest function executed on error request
     */
    putRequest = (url, data, onSuccessRequest, onErrorRequest) => this.resolvePromise(myaxios.put(url, data), onSuccessRequest, onErrorRequest)

    /**
     * Send a delete command to a especific server
     * @param {string} url url to send a delete command
     * @param {function} onSuccessRequest function executed on success request
     * @param {function} onErrorRequest function executed on error request
     */
    deleteRequest = (url, onSuccessRequest, onErrorRequest) => this.resolvePromise(myaxios.delete(url), onSuccessRequest, onErrorRequest)

    /**
     * Send a post command to a especific server
     * @param {string} url url to send a post command
     * @param {any} data data to send
     * @param {function} onSuccessRequest function executed on success request
     * @param {function} onErrorRequest function executed on error request
     */
    postRequest = (url, data, onSuccessRequest, onErrorRequest) => this.resolvePromise(myaxios.post(url, data), onSuccessRequest, onErrorRequest)

    /**
     * Send a put command to a especific server
     * @param {string} url url to send a post command
     * @param {any} data data to send
     * @param {function} onSuccessRequest function executed on success request
     * @param {function} onErrorRequest function executed on error request
     */
    putRequest = (url, data, onSuccessRequest, onErrorRequest) => this.resolvePromise(myaxios.put(url, data), onSuccessRequest, onErrorRequest)
}

export default BaseApi