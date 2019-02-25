import Utilities from "../utils/Utilities";
import { showError } from "./error";
import { hideLoading, showLoading } from "react-redux-loading";

export const RECEIVE_NEW_AVATAR = 'RECEIVE_NEW_AVATAR'

/**
 * Action to receive new avatar
 * @param {string} url Avatar url
 * @param {string} gender 
 */
export function receiveNewAvatar(gender, url){
    return {
        type: RECEIVE_NEW_AVATAR,        
        gender,
        url
    }
}
/**
 * Handle responsible for generating avatar based on gender
 * @param {string} gender male or female
 */
export function handleGenerateAvatar(gender){    
    return async (dispatch) => {       
        dispatch(showLoading)      
        try {
            const avatar = Utilities.generateRandomAvatar(gender)
            dispatch(receiveNewAvatar(gender, avatar.url));
        }
        catch (e) {
            dispatch(showError('New comment', 'The was an error generate avatar. Try again.'));
        }
        return dispatch(hideLoading);    
    }
}