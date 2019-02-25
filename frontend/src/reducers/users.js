import { RECEIVE_USERS, ADD_USER, UPDATE_USER } from '../actions/users';
import Utilities from '../utils/Utilities';
/**
 * This reducer specify how the users's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function users(state = {}, action) {   
    switch (action.type) {
        /** Receive users from local storage */
        
        case RECEIVE_USERS:
            const users = Utilities.normalize(action.users) 
            return {
                ...state,
                ...users
            }       
        case ADD_USER:   
            let user = {}
            user[action.user.id] = action.user 
            return {
                ...state,
                ...user
            } 
        case UPDATE_USER:         
            return {
                ...state,
                [action.user.id]: {
                    ...state[action.user.id],
                    avatar: action.user.avatar,
                    gender: action.user.gender
                }
        } 
        default:
            return state
    }
}