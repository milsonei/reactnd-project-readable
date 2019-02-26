import {
    RECEIVE_COMMENTS,
    EDIT_COMMENT,
    ADD_COMMENT,
    SET_VOTE_COMMENT,
    UP_VOTE_COMMENT,
    DOWN_VOTE_COMMENT,
    DELETE_COMMENT,
    DELETE_ALL_COMMENTS    
} from '../actions/comments'
import Utilities from '../utils/Utilities';
/**
 * This reducer specify how the comments's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function comments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            const comments = Utilities.normalize(action.comments)
            return {
                ...state,
                ...comments
            }
        case EDIT_COMMENT:
            const {
                id,
                body
            } = action
            return {
                ...state,
                [id]: {
                    ...state[id],
                    body
                }
            }
        case ADD_COMMENT:
            const comment = {}
            comment[action.comment.id] = action.comment
            return {
                ...state,
                ...comment
            }
        case DELETE_COMMENT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    deleted: true
                }
            }      
        case DELETE_ALL_COMMENTS:
            const filtered_keys = Object.keys(state).filter(key => state[key].parentId === action.parentId)
            const clone = {...state}
            filtered_keys.forEach(key => clone[key].parentDeleted = true)
            return {
               ...clone
            }
        case SET_VOTE_COMMENT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: action.voteScore
                }
            }
        case UP_VOTE_COMMENT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore + 1
                }
            }
        case DOWN_VOTE_COMMENT:        
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore - 1
                }
            }
        default:
            return state
    }
}