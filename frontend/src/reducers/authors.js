import {
    RECEIVE_POSTS,
    ADD_POST
} from '../actions/posts'
import {
    RECEIVE_COMMENTS,
    ADD_COMMENT,
} from '../actions/comments'
import {
    SET_AUTHED_USER
} from '../actions/authedUser'
import Utilities from '../utils/Utilities'
import { RECEIVE_AUTHORS } from '../actions/authors';
/**
 * Extract all authors from posts and comments.
 * An avatar is created for each author
 * @param {any} state 
 * @param {any} action 
 */
export default function authors(state = {}, action) {
    let authors    
    switch (action.type) {
        /** Receive authors from local storage */
        case RECEIVE_AUTHORS:
            return {
                ...state,
                ...action.authors
            }
        case SET_AUTHED_USER:           
            authors = Utilities.createAuthors([action.id], state)    
            return Object.assign({}, state,
                {   
                    ...authors,                 
                    addToCache: Object.keys(authors).length > 0
                })
        case RECEIVE_POSTS:
            authors = Utilities.createAuthors([...new Set((action.posts.map(p => p.author)).sort())], state)   
            return Object.assign({}, state,
                {   
                    ...authors,                 
                    addToCache: Object.keys(authors).length > 0
                })
        case RECEIVE_COMMENTS:
            authors = Utilities.createAuthors([...new Set((action.comments.map(p => p.author)).sort())], state)            
            return Object.assign({}, state,
                {   
                    ...authors,                 
                    addToCache: Object.keys(authors).length > 0
                })
        case ADD_POST:
            authors = Utilities.createAuthors([action.post.author], state)            
            return Object.assign({}, state,
                {   
                    ...authors,                 
                    addToCache: Object.keys(authors).length > 0
                })
        case ADD_COMMENT:
            authors = Utilities.createAuthors([action.comment.author], state)            
            return Object.assign({}, state,
                {   
                    ...authors,                 
                    addToCache: Object.keys(authors).length > 0
                })
        default:
            return state
    }
}