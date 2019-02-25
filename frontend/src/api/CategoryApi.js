import BaseApi from './BaseApi'
/**
 * Class responsible for sending requests to the remote data server relative to the Category entity. 
 * This class is a BaseApi class specialization.
 */
class CategoryApi extends BaseApi {
    constructor() {
        super('/categories');
    }
    /**
     * Get all categories
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    getAll = (onSuccess, onError) => this.getRequest(this.url, onSuccess, onError)

    /**
     * Get all post from a specific category
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    getAllPosts = (id, onSuccess, onError) => this.getRequest(`/${id}/posts`, onSuccess, onError)

}

const categoryApi = new CategoryApi()

export default categoryApi