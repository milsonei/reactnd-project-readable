import {
    SORT
} from '../actions/sort'
/**
 * This reducer specify how the sort's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function sort(state = {}, action) {
    switch (action.type) {
        case SORT:                    
            const { field, mode, itemToSort } = action
            return {
                ...state,
                [itemToSort]: {
                    field,
                    mode
                }
            }        
        default:
            return state
    }
}