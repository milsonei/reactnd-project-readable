import postApi from '../utils/PostApi'
import Post from '../model/Post'
import { showLoading, hideLoading } from 'react-redux-loading'
import DialogUtil from '../utils/DialogUtil'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const SET_VOTE_POST = 'SET_VOTE_POST'
export const UP_VOTE_POST = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'

export function receivePosts(posts){
    return {
        type: RECEIVE_POSTS,
        posts: posts
    }
}

function editPost(id, title, body){
    return {
        type: EDIT_POST,
        id,
        title,
        body
    }
}

function addPost(post){
    return {
        type: ADD_POST,
        post
    }
}

function upVotePost({ id }){
    return {
        type: UP_VOTE_POST,
        id        
    }
}

function downVotePost({ id }){
    return {
        type: DOWN_VOTE_POST,
        id
    }
}

function setVotePost({ id, voteScore }){
    return {
        type: SET_VOTE_POST,
        id,
        voteScore
    }
}

export function handleEditPost(id, title, body){
    return async (dispatch) => {       
        dispatch(showLoading)      
        try {           
            await postApi.edit(id, title, body);         
            dispatch(editPost(id, title, body));   
        }
        catch (e) {            
            DialogUtil.showErrorNotification('Edit post', 'The was an error editing post. Try again.');
        }
        return dispatch(hideLoading);    
    }
}

export function handleAddPost(title, body, author, category){
    return async (dispatch) => {       
        dispatch(showLoading)

        const newPost = new Post(title, body, author, category)

        try {
            const res = await postApi.add(newPost);
            const post = res.data;
            dispatch(addPost(post));
        }
        catch (e) {
            DialogUtil.showErrorNotification('New post', 'The was an error adding new post. Try again.');
        }
        return dispatch(hideLoading);    
    }
}

export function handleUpVotePost(id){
    return async (dispatch) => {     
        dispatch(showLoading)
        try {         
            dispatch(upVotePost(id));   
            const res = await postApi.upVote(id);    
            dispatch(setVotePost(id, res.voteScore));
        }
        catch (e) {
            dispatch(downVotePost(id));
            DialogUtil.showErrorNotification('Up vote', 'The was an error up voting the post. Try again.');
        }
        return dispatch(hideLoading);
    }
}

export function handleDownVotePost(id){
    return async (dispatch) => {     
        dispatch(showLoading)
        try {
            dispatch(downVotePost(id));   
            const res = await postApi.downVote(id);
            const post = res.data;
            dispatch(setVotePost(post.id, post.voteScore));
        }
        catch (e) {
            dispatch(upVotePost(id));   
            DialogUtil.showErrorNotification('Down vote', 'The was an error down voting the post. Try again.');
        }
        return dispatch(hideLoading);
    }
}