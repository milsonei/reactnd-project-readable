import {
    ENABLE_COMMENT_EDIT_MODE,
    DISABLE_COMMENT_EDIT_MODE
} from '../actions/commentInEditMode'
/**
 * This reducer specify how the editMode's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function editMode(state = {}, action) {
    switch (action.type) {        
        case ENABLE_COMMENT_EDIT_MODE:                            
            return {                   
                    id: action.id,
                    parentId: action.parentId
            }    
        case DISABLE_COMMENT_EDIT_MODE:                            
            return {                   
                    id: '',
                    parentId: ''
            }                    
        default:
            return state
    }
}