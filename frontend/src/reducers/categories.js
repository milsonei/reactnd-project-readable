import { RECEIVE_CATEGORIES } from '../actions/categories'
/**
 * This reducer specify how the categories's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function categories( state = null, action){
    switch (action.type) {
        case RECEIVE_CATEGORIES:
        let categories = {}
        action.categories.forEach(category => categories[category.path] = category)
        return {
            ...state,
            ...categories
        }
        default:
            return state
    }
}