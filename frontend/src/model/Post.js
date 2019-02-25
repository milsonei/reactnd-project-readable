import Utilities from '../utils/Utilities'
/**
 * Class associated with a data entity Post
 */
class Post {
    /**
     * Constructor
     * @param {string} title Post title
     * @param {string} body Post body
     * @param {string} author Post author
     * @param {string} category Post category
     */
    constructor(title, body, author, category){
        this.id = Utilities.generateUID()
        this.timestamp = Utilities.generateTimestamp()
        this.title = title
        this.body = body
        this.author = author
        this.category = category
    }
    /**
     *  UUID should be fine, but any unique id will work
     */
    id;
    /**
     * timestamp in whatever format you like, you can use Date.now() if you like
     */
    timestamp;
    /**
     * Post title
     */
    title;
    /**
     * Post body
     */
    body;
    /**
     * Post author
     */
    author;
    /**
     * Any of the categories listed in categories.js. Feel free to extend this list as you desire.
     */
    category;
    /**
     * Net votes that the post received (default: 1)
     */
    voteScore = 1;
    /**
     * Checked if the post was 'deleted' (no access on the front end), (default: false)
     */
    deleted = false;
}

export default Post;