import BaseApi from './BaseApi'
/**
 * Class responsible for sending requests to the remote data server relative to the Post entity. 
 * This class is a BaseApi class specialization.
 */
class PostApi extends BaseApi {

    constructor() {
        super('/posts');
    }

    /**
     * Get all of the posts for a particular category     
     * @param {string} category Post category
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    getAllByCategory = (category, onSuccess, onError) => this.getRequest(`/${category}${this.url}`, onSuccess, onError)

    /**
     * Get all of the posts. 
     * Useful for the main page when no category is selected     
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    getAll = (onSuccess, onError) => this.getRequest(this.url, onSuccess, onError)

    /**
     * Get the details of a single post
     * @param {string} id single post id
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     */
    get = (id, onSuccess, onError) => this.getRequest(`${this.url}/${id}`, onSuccess, onError)

    /**
     * Add a new post
     * @param {Post} data Post instance
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    add = (data, onSuccess, onError) => this.postRequest(this.url, data, onSuccess, onError)

    /**
     * Sets a post's deleted flag to 'true'
     * @param {string} id Post id
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    delete = (id, onSuccess, onError) => this.deleteRequest(`${this.url}/${id}`, onSuccess, onError)

    /**
     * Used to vote for a post
     * @param {string} id Post id
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    upVote = (id, onSuccess, onError) => this.postRequest(`${this.url}/${id}`, {
        "option": "upVote"
    }, onSuccess, onError)

    /**
     * Used to rate against a post
     * @param {string} id 
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    downVote = (id, onSuccess, onError) => this.postRequest(`${this.url}/${id}`, {
        "option": "downVote"
    }, onSuccess, onError)

    /**
     * Edit the details of an existing post
     * @param {string} id Post id
     * @param {string} title Post title
     * @param {string} body Post body
     * @param {string} category Post category
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    edit = (id, title, body, category, onSuccess, onError) => this.putRequest(`${this.url}/${id}`, {
        title,
        body,
        category
    }, onSuccess, onError)

}

const postApi = new PostApi()

export default postApi;