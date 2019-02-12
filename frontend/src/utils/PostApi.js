import BaseApi from './BaseApi'
/**
 * Class responsible for sending the post requests to the server
 */
class PostApi extends BaseApi {

    constructor() {
        super('/posts');
    }

    /**
     * Get all of the posts for a particular category     
     * @param {string} category Post category
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    getAllByCategory = (category, onSucess, onError) => this.getRequest(`/${category}${this.url}`, onSucess, onError)

    /**
     * Get all of the posts. 
     * Useful for the main page when no category is selected     
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    getAll = (onSucess, onError) => this.getRequest(this.url, onSucess, onError)

    /**
     * Get the details of a single post
     * @param {string} id single post id
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     */
    get = (id, onSucess, onError) => this.getRequest(`${this.url}/${id}`, onSucess, onError)

    /**
     * Add a new post
     * @param {Post} data Post instance
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    add = (data, onSucess, onError) => this.postRequest(this.url, data, onSucess, onError)

    /**
     * Sets a post's deleted flag to 'true'
     * @param {string} id Post id
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    delete = (id, onSucess, onError) => this.deleteRequest(`${this.url}/${id}`, onSucess, onError)

    /**
     * Used to vote for a post
     * @param {string} id Post id
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    upVote = (id, onSucess, onError) => this.postRequest(`${this.url}/${id}`, {
        "option": "upVote"
    }, onSucess, onError)

    /**
     * Used to rate against a post
     * @param {string} id 
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    downVote = (id, onSucess, onError) => this.postRequest(`${this.url}/${id}`, {
        "option": "downVote"
    }, onSucess, onError)

    /**
     * Edit the details of an existing post
     * @param {string} id Post id
     * @param {string} title Post title
     * @param {string} body Post body
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     * @returns {Promise} promise
     */
    edit = (id, title, body, onSucess, onError) => this.putRequest(`${this.url}/${id}`, {
        title,
        body
    }, onSucess, onError)

}

const postApi = new PostApi()

export default postApi;