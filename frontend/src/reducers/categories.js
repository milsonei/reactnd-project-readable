import { RECEIVE_CATEGORIES } from '../actions/categories'

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