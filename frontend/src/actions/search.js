import {
    showLoading,
    hideLoading
} from 'react-redux-loading'
import { showError } from './error';
export const CLEAR_SEARCH = "CLEAR_SEARCH"
export const SET_SEARCH = "SET_SEARCH"

/**
 * Action creator that indicates the next text to be searched.
 * @param {string} text 
 */
export function setSearch(text){    
    return {
        type: SET_SEARCH,
        text
    }
}

/**
 * Action creator that cleans the text previously searched
 */
export function clearSearch(){    
    return {
        type: SET_SEARCH
    }
}

/**
 * The handler responsible for searching posts and comments
 * @param {string} text The text to search
 */
export function handleSetSearch(text) {
    return async (dispatch) => {
        dispatch(showLoading)
        try {           
            dispatch(setSearch(text))
        } catch (e) {
            dispatch(showError('Search', `The was an error search posts and comments. Try again.`));
        }
        return dispatch(hideLoading)
    }
}

/**
 * The handler responsible for searching posts and comments
 * @param {string} text The text to search
 */
export function handleClearSearch(text) {
    return async (dispatch) => {
        dispatch(showLoading)
        try {           
            dispatch(clearSearch(text))
        } catch (e) {
            dispatch(showError('Search', `The was an error search posts and comments. Try again.`));
        }
        return dispatch(hideLoading)
    }
}