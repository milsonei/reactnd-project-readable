import utilities from '../utils/utilities'
/**
 * Class about post comment
 */
class Comment{
    constructor(body, author, parentId){
        this.id = utilities.generateUID()
        this.timestamp = utilities.generateTimestamp()
        this.body = body
        this.author = author
        this.parentId = parentId
    }
    /**
     * Any unique ID. As with posts, UUID is probably the best here.
     */
    id;
    /**
     * timestamp. Get this however you want.
     */
    timestamp;
    /**
     * Comment body
     */
    body;
    /**
     * Author of comment
     */
    author;
    /**
     * Should match a post id in the database.
     */
    parentId;
    /**
     * Checked if the post was 'deleted' (no access on the front end), (default: false)
     */
    deleted = false;
    /**
     * Marked when the parent post was deleted, but the comment itself was not.
     */
    parentDeleted = false;
}

export default Comment;