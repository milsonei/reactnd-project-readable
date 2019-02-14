import DialogUtil from '../utils/DialogUtil'
const error = (store) => (next) => (action) => {
    if (action.type === "SHOW_ERROR"){
        const { title, message } = action.error;
        DialogUtil.showErrorNotification(title, message);  
    }
    const returnValue = next(action)    
    return returnValue
}

export default error