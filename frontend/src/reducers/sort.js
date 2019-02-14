import {
    SORT_FEED
} from '../actions/sort'

export default function sort(state = null, action) {
    switch (action.type) {
        case SORT_FEED:            
            let { field } = action           
            if (field) {                
                return {
                    ...state,
                    field
                }
            }
            return state            
        default:
            return state
    }
}