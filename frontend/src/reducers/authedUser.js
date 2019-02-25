import {
    SET_AUTHED_USER, SET_SIGNOUT
} from '../actions/authedUser'
/**
 * This reducer specify how the authedUser's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            const {
                id,
                date
            } = action
            return {
                id,
                date
               }
        case SET_SIGNOUT:
               return {
                   id : '',
                   date: null
                  }
        default:
            return state
    }
}