import BaseApi from './BaseApi'
/**
 * Class responsible for sending requests to the remote data server relative to the Comment entity. 
 * This class is a BaseApi class specialization.
 */
class CommentApi extends BaseApi {

    constructor() {
        super('/comments');
    }

    /**
     * Get all of the comments. 
     * Useful for the main page when no category is selected or get all of the comments for a particular category
     * @param {string} postId Post id
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     */
    getAll = (postId, onSuccess, onError) => this.getRequest(`/posts/${postId}${this.url}`, onSuccess, onError)

    /**
     * Get the details of a single comment
     * @param {string} id single comment id
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     */
    get = (id, onSuccess, onError) => this.getRequest(`${this.url}/${id}`, onSuccess, onError)

    /**
     * Add a new comment
     * @param {Comment} data Comment instance
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     */
    add = (data, onSuccess, onError) => this.postRequest(this.url, data, onSuccess, onError)

    /**
     * Sets a comment's deleted flag to 'true'
     * @param {string} id Comment id
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     */
    delete = (id, onSuccess, onError) => this.deleteRequest(`${this.url}/${id}`, onSuccess, onError)

    /**
     * Used to vote for a comment
     * @param {string} id Comment id
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     */
    upVote = (id, onSuccess, onError) => this.postRequest(`${this.url}/${id}`, {
        "option": "upVote"
    }, onSuccess, onError)

    /**
     * Used to rate against a comment
     * @param {string} id 
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     */
    downVote = (id, onSuccess, onError) => this.postRequest(`${this.url}/${id}`, {
        "option": "downVote"
    }, onSuccess, onError)


    /**
     * Edit the details of an existing comment
     * @param {string} id Comment id
     * @param {string} body Comment body
     * @param {function} onSuccess function executed on success request
     * @param {function} onError function executed on error request
     */
    edit = (id, timestamp, body, onSuccess, onError) => this.putRequest(`${this.url}/${id}`, {
        body
    }, onSuccess, onError)
}

const commentApi = new CommentApi();

export default commentApi;