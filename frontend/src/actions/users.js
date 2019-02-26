
import userApi from '../api/UserApi'
import User from '../model/User'
import {
    showLoading,
    hideLoading
} from 'react-redux-loading'
import {
    showError
} from './alerts'
import { enableRedirect, TO_LOGIN } from './redirect';
import { handleSignout } from './authedUser';
export const ADD_USER = 'ADD_USER'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER = 'UPDATE_USER'
export const CHANGE_AVATAR = 'CHANGE_AVATAR'
/**
 * Action responsible for receiving a collection of users
 * @param {string} users Collection of users
 */
export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

/**
 * Action responsible for adding a user
 * @param {any} user The user
 */
function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

/**
 * Action responsible for update a user
 * @param {any} user The user
 */
function updateUser(user) {
    return {
        type: UPDATE_USER,
        user
    }
}

/**
 * The async handler responsible for get user
 * @param {string} id The id of the user 
 */
export function handleGetUser(id) {
    return async (dispatch) => {
        dispatch(showLoading)

        try {
            const res = await userApi.get(id)
            const user = res.data;
            dispatch(addUser(user))            
        } catch (e) {
            dispatch(showError('New user', 'The was an error adding new user. Try again.'));
        }
        return dispatch(hideLoading)
    }
}

/**
 * The async handler responsible for sending new user
 * @param {string} id The id of the user
 * @param {string} gender The user gender
 * @param {string} avatar the avatar of the user
 * @param {string} password the encrypted password of the user
 */
export function handleAddUser(id, gender, avatar, password) {
    return async (dispatch) => {
        dispatch(showLoading)       
      
        try {
            const res = await userApi.get(id)
            const user = res.data
            if (user.id){
                dispatch(showError('New user', 'The user already exists. Try again.'));                       
            }else{
                const newUser = new User(id, gender, avatar, password)
                const res = await userApi.add(newUser)
                const user = res.data;
                dispatch(addUser(user))                
                dispatch(enableRedirect(TO_LOGIN)) 
            }         
        } catch (e) {
            dispatch(showError('New user', 'The was an error adding new user. Try again.'));
        }
        return dispatch(hideLoading)
    }
}

/**
 * The async handler responsible for changing user avatar
 * @param {string} id The id of the user
 * @param {string} gender the gender of the user
 * @param {string} avatar the avatar of the user
 */
export function handleChangeAvatar(id, gender, avatar) {
    return async (dispatch) => {
        dispatch(showLoading)

        try {
            const res = await userApi.changeAvatar(id, gender, avatar)
            const user = res.data
            dispatch(updateUser(user))
        } catch (e) {
            dispatch(showError('New user', 'The was an error changing avatar. Try again.'));
        }
        return dispatch(hideLoading)
    }
}


/**
 * The async handler responsible for changing user password
 * @param {string} id The id of the user
 * @param {string} currentPassword the current password of the user
 * @param {string} newPassword the new password of the user
 */
export function handleChangePassword(id, currentPassword, newPassword) {
    return async (dispatch) => {
        dispatch(showLoading)        
        try {
            const res = await userApi.get(id)
            const user = res.data
            if (user.id){                
                if (user.password === currentPassword){
                    await userApi.changePassword(id, newPassword)
                    dispatch(handleSignout())
                    dispatch(enableRedirect(TO_LOGIN)) 
                }else{
                    dispatch(showError('Change password', 'The current password entered is invalid!'));
                }
            }
            
        } catch (e) {
            dispatch(showError('Change password', 'The was an error changing password. Try again.'));
        }
        return dispatch(hideLoading)
    }
}