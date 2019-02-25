import { showLoading, hideLoading } from "react-redux-loading";

export const ENABLE_REDIRECT = "ENABLE_REDIRECT"
export const DISABLE_REDIRECT = "DISABLE_REDIRECT"
export const TO_LOGIN = '/signin'
export const TO_HOME = '/'
/**
 * Indicates that a route redirection will occur
 * @param {string} to 
 * @param {string} next 
 */
export function enableRedirect(to = "/", next = ''){    
    return {
        type: ENABLE_REDIRECT,
        to,
        next
    }
}

function disableRedirect(){    
    return {
        type: DISABLE_REDIRECT
    }
}
/**
 * Disable redirect or queue next redirect
 * @param {any} redirect object redirect with "to" and "next" parameters
 */
export function handleDisableRedirect(redirect = {}){
    return (dispatch) => {
        dispatch(showLoading)
       
        if (redirect.next){            
            dispatch(enableRedirect(redirect.next))
        }else{            
            dispatch(disableRedirect())
        }
       
        return dispatch(hideLoading)
    }
}