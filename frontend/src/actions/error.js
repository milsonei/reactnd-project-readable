export const SHOW_ERROR = 'SHOW_ERROR'
export const HIDE_ERROR = 'HIDE_ERROR'
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