import Utilities from '../utils/Utilities';
const cache = ({ getState }) => (next) => (action) => {
    const returnValue = next(action)
    /** Get state after update */
    const store = getState();
    console.log(store.authors)
    /** Stores simplified author data to localstorage repository  */
    if (store.authors &&  store.authors.addToCache){
        const authors = store.authors;
        authors.addToCache = false        
        Utilities.saveToLocalStorage('authors', authors)
    }
    /** Stores the name of the field responsible for ordering posts in the feed */
    if (action.type === "SORT_FEED" && store.sort) {        
        Utilities.saveToLocalStorage('sort', store.sort.field)
    }
    return returnValue
}

export default cache