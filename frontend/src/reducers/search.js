import {
    SET_SEARCH,
    CLEAR_SEARCH
} from '../actions/search'
/**
 * This reducer specify how the search's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function sort(state = {}, action) {
    switch (action.type) {
        case SET_SEARCH:                    
            const { text } = action
            return {
                text
            }
        case CLEAR_SEARCH:                             
            return {
                text: ''
            }
        default:
            return state
    }
}