import {
    RECEIVE_NEW_AVATAR
} from '../actions/avatar'
/**
 * This reducer specify how the avatar's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function avatar(state = {}, action) {
    switch (action.type) {
        case RECEIVE_NEW_AVATAR:        
            return {
                url : action.url,
                gender: action.gender
            }       
        default:
            return state
    }
}