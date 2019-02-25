import {
    SET_REMEMBER
} from '../actions/remember'
/**
 * This reducer specify how the remember's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function remember(state = {}, action) {
    switch (action.type) {        
        case SET_REMEMBER:                            
            return {                   
                    id: action.id,
                    date: action.date
            }                 
        default:
            return state
    }
}