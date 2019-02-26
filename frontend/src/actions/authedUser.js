import userApi from '../api/UserApi'
import {
    showLoading,
    hideLoading
} from 'react-redux-loading'
import {
    showError
} from './alerts'
import Utilities from '../utils/Utilities';
import { setRemember } from './remember';
import { receiveNewAvatar } from './avatar';

export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const SET_SIGNOUT = 'SET_SIGNOUT'

export function setAuthedUser(id){
    return {
        type: SET_AUTHED_USER,
        id: id || '',
        date: id ? Utilities.generateTimestamp() : null
    }
}

export function setSignout(){
    return {
        type: SET_SIGNOUT
    }
}

/**
 * The async handler responsible for validate user account
 * @param {string} userName The userName of the user account
 * @param {string} password The password of the user account
 * @param {string} remember Remember that this is the last user to access the site in this browser
 */
export function handleSignin(userName, password, remember) {
    return async (dispatch) => {
        dispatch(showLoading)

        try {
            const res = await userApi.get(userName)
            const user = res.data; 
            if (user.id === ''){
                dispatch(showError('Authentication', 'User not found. Try again.'));
            }else{
                if (user.password === password){
                    dispatch(setAuthedUser(user.id)) 
                    if (remember){
                        dispatch(setRemember(user.id))
                    }
                    dispatch(receiveNewAvatar(user.gender, user.avatar)) 
                }else{
                    dispatch(showError('Authentication', 'Your provided credentials are invalid. Try again.'));
                }
            }
        } catch (e) {
            dispatch(showError('Authentication', 'The was an error getting user. Try again.'));
        }
        return dispatch(hideLoading)
    }
}

/**
 * The async handler responsible for signout
 */
export function handleSignout() {
    return async (dispatch) => {
        dispatch(showLoading)
        dispatch(setSignout()) 
        return dispatch(hideLoading)
    }
}