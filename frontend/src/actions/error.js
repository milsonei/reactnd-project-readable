export const SHOW_ERROR = 'SHOW_ERROR'
export const HIDE_ERROR = 'HIDE_ERROR'

export function showError(title, message){
    return {
        type: SHOW_ERROR,
        error: {
            title,
            message
        }
        
    }
}