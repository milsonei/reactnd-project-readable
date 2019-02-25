
const enabled = process.env.NODE_ENV === 'development'
/**
 * Middleware responsible for logging action details and status details in the browser console. Available only in the development environment.
 */
const logger = (store) => (next) => (action) => {
    let returnValue
    if (enabled){
        console.group(action.type)
            console.log('The action:', JSON.stringify(action))
            returnValue = next(action)
            console.log('The new state:', JSON.stringify(store.getState()))
        console.groupEnd()
    }else{
        returnValue = next(action)
    }
   
    return returnValue
}

export default logger