import {
    showLoading,
    hideLoading
} from 'react-redux-loading'
import { showError } from './alerts';
export const SORT = "SORT"
/**
 * 
 * @param {string} field Field to sort
 * @param {string} mode Sort mode like asc (ascending) and desc (descending)
 * @param {string} itemToSort Item to sort like posts or comments
 */
export function sortItems(field, mode, itemToSort){    
    return {
        type: SORT,
        field,
        mode,
        itemToSort
    }
}


/**
 * The handler responsible for sorting posts or comments
 * @param {string} field The field name
 * @param {string} mode The sorting mode
 * @param {string} type Item to sort - posts or comments
 */
export function handleSetSort(field, mode, itemToSort) {
    return async (dispatch) => {
        dispatch(showLoading)
        try {           
            dispatch(sortItems(field, mode, itemToSort))
        } catch (e) {
            dispatch(showError(itemToSort, `The was an error sorting ${itemToSort}. Try again.`));
        }
        return dispatch(hideLoading)
    }
}