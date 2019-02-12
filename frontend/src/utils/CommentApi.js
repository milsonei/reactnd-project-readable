import BaseApi from './BaseApi'
/**
 * Class responsible for sending the comment comment to the server
 */
class CommentApi extends BaseApi {

    constructor() {
        super('/comments');
    }

    /**
     * Get all of the comments. 
     * Useful for the main page when no category is selected or get all of the comments for a particular category
     * @param {string} postId Post id
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     */
    getAll = (postId, onSucess, onError) => this.getRequest(`/comments/${postId}${this.url}`, onSucess, onError)

    /**
     * Get the details of a single comment
     * @param {string} id single comment id
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     */
    get = (id, onSucess, onError) => this.getRequest(`${this.url}/${id}`, onSucess, onError)

    /**
     * Add a new comment
     * @param {Comment} data Comment instance
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     */
    add = (data, onSucess, onError) => this.postRequest(this.url, data, onSucess, onError)

    /**
     * Sets a comment's deleted flag to 'true'
     * @param {string} id Comment id
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     */
    delete = (id, onSucess, onError) => this.deleteRequest(`${this.url}/${id}`, onSucess, onError)

    /**
     * Used to vote for a comment
     * @param {string} id Comment id
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     */
    upVote = (id, onSucess, onError) => this.postRequest(`${this.url}/${id}`, {
        "option": "upVote"
    }, onSucess, onError)

    /**
     * Used to rate against a comment
     * @param {string} id 
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     */
    downVote = (id, onSucess, onError) => this.postRequest(`${this.url}/${id}`, {
        "option": "downVote"
    }, onSucess, onError)


    /**
     * Edit the details of an existing comment
     * @param {string} id Comment id
     * @param {timestamp} timestamp Comment timestamp
     * @param {string} body Comment body
     * @param {function} onSucess function executed on success request
     * @param {function} onError function executed on error request
     */
    edit = (id, timestamp, body, onSucess, onError) => this.putRequest(`${this.url}/${id}`, {
        timestamp,
        body
    }, onSucess, onError)
}

const commentApi = new CommentApi();

export default commentApi;