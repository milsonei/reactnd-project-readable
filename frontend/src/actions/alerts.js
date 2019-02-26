export const SHOW_ERROR = 'SHOW_ERROR'
export const SHOW_INFO = 'SHOW_INFO'
/**
 * Action to show an error notification about the previous action having completed with error
 * @param {string} title 
 * @param {message} message 
 */
export function showError(title, message){
    return {
        type: SHOW_ERROR,
        error: {
            title,
            message
        }
        
    }
}

/**
 * Action to show an info notification about the previous action having completed with error
 * @param {string} title 
 * @param {message} message 
 */
export function showInfo(title, message){
    return {
        type: SHOW_INFO,
        info: {
            title,
            message
        }
        
    }
}