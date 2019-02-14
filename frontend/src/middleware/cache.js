import Utilities from '../utils/Utilities';
const cache = ({ getState }) => (next) => (action) => {
    const returnValue = next(action)
    /** Get state after update */
    const state = getState();
    /** Stores simplified author data to localstorage repository  */
    if (state.authors &&  state.authors.addToCache){
        const authors = Object.assign({},
            {   
                ...state.authors,
                addToCache: false
            })     
        Utilities.saveToLocalStorage('authors', authors)
    }
    /** Stores the name of the field responsible for ordering posts in the feed */
    if (action.type === "SORT_FEED" && state.sort) {        
        Utilities.saveToLocalStorage('sort', state.sort.field)
    }
    return returnValue
}

export default cache