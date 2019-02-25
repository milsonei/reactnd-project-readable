import DialogUtil from '../utils/DialogUtil'
/**
 * Middleware responsible for being a common point to capture and view the error message using the notification component from React UI library ANTD.
 */
const error = () => (next) => (action) => {
    if (action.type === "SHOW_ERROR"){
        const { title, message } = action.error;
        DialogUtil.showErrorNotification(title, message);  
    }
    const returnValue = next(action)    
    return returnValue
}

export default error