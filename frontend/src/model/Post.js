import utilities from '../utils/utilities'
/**
 * Post
 */
class Post {
    constructor(title, body, author, category){
        this.id = utilities.generateUID()
        this.timestamp = utilities.generateTimestamp()
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