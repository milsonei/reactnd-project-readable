import BaseApi from './BaseApi'
/**
 * Class responsible for sending the post category requests to the server
 */
class CategoryApi extends BaseApi {
    constructor() {
        super('/categories');
    }
    /**
     * Get all categories
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    getAll = (onSucess, onError) => this.getRequest(this.url, onSucess, onError)

    /**
     * Get all post from a specific category
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    getAllPosts = (id, onSucess, onError) => this.getRequest(`/${id}/posts`, onSucess, onError)

}

const categoryApi = new CategoryApi()

export default categoryApi