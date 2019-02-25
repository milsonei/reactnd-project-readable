import Utilities from "../utils/Utilities";

export const SET_REMEMBER = "SET_REMEMBER"
/**
 * Action that indicates the username to be remembered at next login
 * @param {string} username Username
 */
export function setRemember(username){    
    return {
        type: SET_REMEMBER,
        id: username,
        date: username ? Utilities.generateTimestamp() : null
    }
}