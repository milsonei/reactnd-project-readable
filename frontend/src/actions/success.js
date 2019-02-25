export const SET_SUCCESS = "SET_SUCCESS"
export const CLEAR_SUCCESS = "CLEAR_SUCCESS"
/**
 * Action to indicate success of previous action.
 */
export function setSuccess(){    
    return {
        type: SET_SUCCESS
    }
}

/**
 * Clear sucess information
 */
export function clearSuccess(){    
    return {
        type: CLEAR_SUCCESS
    }
}