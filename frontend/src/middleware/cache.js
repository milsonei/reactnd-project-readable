import Utilities from '../utils/Utilities';
import { SORT } from '../actions/sort';
import { SET_AUTHED_USER, SET_SIGNOUT } from '../actions/authedUser';
import { SET_REMEMBER } from '../actions/remember';
/**
 * Middleware responsible for being a common point of capture and storage in the local data storage coming from several actions.
 */
const cache = () => (next) => (action) => {
    const returnValue = next(action)
    if (action.type === SORT) {   
        Utilities.saveToLocalStorage(`sort-${action.itemToSort}`, { field: action.field, mode: action.mode })
    }

    if (action.type === SET_AUTHED_USER) {
        if (action.id){
            Utilities.saveToLocalStorage('authed-user', {
                id: action.id,
                date: action.date
            })
        }
    } 

    if (action.type === SET_SIGNOUT) {
        Utilities.saveToLocalStorage('authed-user', {
            id: '',
            date: null
        })    
    } 

    if (action.type === SET_REMEMBER) {
        Utilities.saveToLocalStorage('remember', {
            id: action.id,
            date: action.date
        })    
    } 
    return returnValue
}

export default cache