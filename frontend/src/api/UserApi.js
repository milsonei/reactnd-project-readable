import BaseApi from './BaseApi'
/**
 * Class responsible for sending requests to the remote data server relative to the User entity. 
 * This class is a BaseApi class specialization.
 */
class UserApi extends BaseApi {

    constructor() {
        super('/users');
    }

    /**
     * Get all of the users. 
     * Useful for the main page when no category is selected     
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    getAll = (onSuccess, onError) => this.getRequest(this.url, onSuccess, onError)

    /**
     * Get the details of a single user
     * @param {string} id single user id
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     */
    get = (id, onSuccess, onError) => this.getRequest(`${this.url}/${id}`, onSuccess, onError)

    /**
     * Add a new user
     * @param {User} data User instance
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    add = (data, onSuccess, onError) => this.postRequest(this.url, data, onSuccess, onError)

     /**
     * Edit the details of an existing user
     * @param {string} id User name
     * @param {string} avatar User avatar
     * @param {string} gender User gender
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    update = (id, gender, avatar, password, onSuccess, onError) => this.putRequest(`${this.url}/${id}`, {       
        gender,
        avatar,
        password
    }, onSuccess, onError)

     /**
     * Change user avatar
     * @param {string} id User name
     * @param {string} avatar User avatar    
     * @param {string} gender User gender    
     */
    changeAvatar = (id, gender, avatar, onSuccess, onError) => this.putRequest(`${this.url}/${id}`, {
        gender,
        avatar        
    }, onSuccess, onError)

    /**
     * Change user password
     * @param {string} id User name
     * @param {string} password User password    
     */
    changePassword = (id, password, onSuccess, onError) => this.putRequest(`${this.url}/${id}`, {
        password
    }, onSuccess, onError)

}

const userApi = new UserApi()

export default userApi;