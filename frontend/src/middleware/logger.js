
const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('The action:', JSON.stringify(action))
        const returnValue = next(action)
        console.log('The new state:', JSON.stringify(store.getState()))
    console.groupEnd()
   
    return returnValue
}

export default logger