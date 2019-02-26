import DialogUtil from '../utils/DialogUtil'
import { SHOW_ERROR, SHOW_INFO } from '../actions/alerts';
/**
 * Middleware responsible for being a common point to capture and view the error and sucess messages using the notification component from React UI library ANTD.
 */
const alerts = () => (next) => (action) => {
    switch (action.type) {
        case SHOW_ERROR:
            DialogUtil.showErrorNotification( action.error.title, action.error.message);  
            break;
        case SHOW_INFO:            
            DialogUtil.showSuccessNotification( action.info.title, action.info.message);  
            break;
        default:
            break;
    }  
    const returnValue = next(action)    
    return returnValue
}

export default alerts