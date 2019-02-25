import {
    SET_SUCCESS, CLEAR_SUCCESS
} from '../actions/success'
/**
 * This reducer specify how the sort's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function success(state = {}, action) {
    switch (action.type) {        
        case SET_SUCCESS:                        
            return {
               yes: true               
            }
        case CLEAR_SUCCESS:                        
            return {
                yes: false               
            }           
        default:
            return state
    }
}