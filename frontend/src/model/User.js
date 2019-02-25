import Utilities from '../utils/Utilities'
/**
 * Class associated with a data entity User
 */
class User {
    /**
     * Constructor
     * @param {string} id User id
     * @param {string} gender User gender
     * @param {string} avatar User avatar
     * @param {string} password User password
     */
    constructor(id, gender, avatar, password){
        this.id = id        
        this.timestamp = Utilities.generateTimestamp()
        this.gender = gender
        this.avatar = avatar
        this.password = password
    }
    /**
     *  id should be fine, but any unique id will work
     */
    id;
    /**
     * timestamp in whatever format you like, you can use Date.now() if you like
     */
    timestamp;
     /**
     * user gender
     */
    gender;
    /**
     * User avatar generate by https://avataaars.io
     */  
    avatar;
    /**
     *  user password
     */  
    password;
}

export default User;