import Utilities from '../utils/Utilities'
/**
 * Class associated with a data entity Comment
 */
class Comment{
    /**
     * Constructor
     * @param {string} body Comment body
     * @param {string} author Comment author
     * @param {string} parentId Post id
     */
    constructor(body, author, parentId){
        this.id = Utilities.generateUID()
        this.timestamp = Utilities.generateTimestamp()
        this.body = body
        this.author = author
        this.parentId = parentId
    }
    /**
     * Any unique ID. As with comment, UUID is probably the best here.
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