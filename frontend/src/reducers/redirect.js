import {
    ENABLE_REDIRECT,
    DISABLE_REDIRECT,
} from '../actions/redirect'
/**
 * This reducer specify how the redirect's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function redirect(state = {}, action) {
    switch (action.type) {        
        case ENABLE_REDIRECT:  
            const { to, next } = action                       
            return {
               to,
               next               
            }
            case DISABLE_REDIRECT:                            
            return {
                to: '',
                next: ''
            }
        
        default:
            return state
    }
}