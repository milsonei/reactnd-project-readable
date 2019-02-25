import {
   SET_LOADED
} from '../actions/loaded'
/**
 * This reducer specify how the loaded's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function loaded(state = null, action) {
    switch (action.type) {        
        case SET_LOADED:                        
            return {
               yes: true               
            }       
        default:
            return state
    }
}