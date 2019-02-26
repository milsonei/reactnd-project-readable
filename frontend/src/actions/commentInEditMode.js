import { showLoading, hideLoading } from "react-redux-loading";
import { showInfo } from "./alerts";

export const ENABLE_COMMENT_EDIT_MODE = "ENABLE_COMMENT_EDIT_MODE"
export const DISABLE_COMMENT_EDIT_MODE = "DISABLE_COMMENT_EDIT_MODE"
/**
 * Action that selects comment to be edited
 */
function enableCommentToEdit(parentId, id){    
    return {
        type: ENABLE_COMMENT_EDIT_MODE,
        id,
        parentId
    }
}

/**
 * Action that cancels editing mode comment
 */
export function disableCommentToEdit(){    
    return {
        type: DISABLE_COMMENT_EDIT_MODE
    }
}

export function handleEnableCommentToEdit(parentId, id){
    return async (dispatch) => {     
        dispatch(showLoading)
        dispatch(enableCommentToEdit(parentId, id)); 
        dispatch(showInfo("Edit", "Attention, the comment is in edit mode. You can now update it in the comment editor."));   
        return dispatch(hideLoading);
    }
}