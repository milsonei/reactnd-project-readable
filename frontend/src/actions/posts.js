import postApi from '../api/PostApi'
import Post from '../model/Post'
import {
    showLoading,
    hideLoading
} from 'react-redux-loading'
import {
    showError
} from './alerts'
import { enableRedirect } from './redirect';
import { deleteAllComments } from './comments';
import { setSuccess } from './success';
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const SET_VOTE_POST = 'SET_VOTE_POST'
export const UP_VOTE_POST = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'
export const INCREMENT_COMMENT_COUNTER = 'INCREMENT_COMMENT_COUNTER'
export const DECREMENT_COMMENT_COUNTER = 'DECREMENT_COMMENT_COUNTER'
export const DELETE_POST = 'DISABLE_POST'
/**
 * Action responsible for receiving a collection of posts
 * @param {string} posts Collection of posts
 */
export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

/**
 * Action responsible for changing post details
 * @param {string} id The post id
 * @param {string} title The title of the post
 * @param {string} body The body of the post
 * @param {string} category The category of the post
 */
function editPost(id, title, body, category) {
    return {
        type: EDIT_POST,
        id,
        title,
        body,
        category
    }
}

/**
 * Action responsible for increment comment count
 * @param {string} id The post id 
 */
export function incrementCommentCounter(id) {
    return {
        type: INCREMENT_COMMENT_COUNTER,
        id
    }
}

/**
 * Action responsible for increment comment count
 * @param {string} id The post id 
 */
export function decrementCommentCounter(id) {
    return {
        type: DECREMENT_COMMENT_COUNTER,
        id
    }
}

/**
 * Action responsible for adding a post
 * @param {any} post The post
 */
function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}


/**
 * Action responsible for disable a post
 * @param {any} post The post
 */
function deletePost(id) {
    return {
        type: DELETE_POST,
        id
    }
}
/**
 * Uptimist update - action responsible for increase the vote score before sending to database 
 * @param {string} id The post id
 */
function upVotePost(id) {
    return {
        type: UP_VOTE_POST,
        id
    }
}
/**
 * Uptimist update - action responsible for descreasing the vote score before sending to database 
 * @param {string} id The post id
 */
function downVotePost(id) {
    return {
        type: DOWN_VOTE_POST,
        id
    }
}
/**
 * Action responsible for confirming the vote score after saving it in the database. In a multi-user 
 * environment, the vote may change before sending.
 * @param {string} id post id
 * @param {number} voteScore vote score
 */
function setVotePost(id, voteScore) {
    return {
        type: SET_VOTE_POST,
        id,
        voteScore
    }
}

/**
 * The handler responsible for sending changed post details
 * @param {string} id The id of the post
 * @param {string} title The title of the post
 * @param {string} body the body of the post
 * @param {string} category the category of the post
 */
export function handleEditPost(id, title, body, category) {
    return async (dispatch) => {
        dispatch(showLoading)
        try {
            await postApi.edit(id, title, body, category)
            dispatch(editPost(id, title, body, category))
            dispatch(enableRedirect(`/${category}/${id}`))
        } catch (e) {
            dispatch(showError('Edit post', 'The was an error editing post. Try again.'));
        }
        return dispatch(hideLoading)
    }
}
/**
 * The async handler responsible for sending new post
 * @param {string} id The id of the post
 * @param {string} title The title of the post
 * @param {string} body the body of the post
 * @param {string} category the category of the post
 */
export function handleAddPost(title, body, author, category) {
    return async (dispatch) => {
        dispatch(showLoading)

        const newPost = new Post(title, body, author, category)

        try {
            const res = await postApi.add(newPost)
            const post = res.data;
            dispatch(addPost(post))
            dispatch(setSuccess())
            dispatch(enableRedirect("/"))
        } catch (e) {
            dispatch(showError('New post', 'The was an error adding new post. Try again.'));
        }
        return dispatch(hideLoading)
    }
}

/**
 * The async handler responsible for sending new post
 * @param {string} id The id of the post
 */
export function handleDeletePost(id) {
    return async (dispatch) => {
        dispatch(showLoading)
     
        try {
            const res = await postApi.delete(id)
            const post = res.data;
            dispatch(deletePost(post.id))
            dispatch(deleteAllComments(id))          
            dispatch(setSuccess())
            dispatch(enableRedirect())
        } catch (e) {
            dispatch(showError('New post', 'The was an error delete post. Try again.'));
        }
        return dispatch(hideLoading)
    }
}

/**
 * The async handler responsible for increase the vote score
 * @param {string} id The post id
 */
export function handleUpVotePost(id) {
    return async (dispatch) => {
        dispatch(showLoading)
        try {
            dispatch(upVotePost(id));
            const res = await postApi.upVote(id)
            const post = res.data
            dispatch(setVotePost(id, post.voteScore))
        } catch (e) {
            dispatch(showError('Up vote', 'The was an error up voting the post. Try again. Detail:' + e.message))
            dispatch(downVotePost(id));
        }
        return dispatch(hideLoading);
    }
}
/**
 * The async handler responsible for decreasing the vote score
 * @param {string} id The post id
 */
export function handleDownVotePost(id) {
    return async (dispatch) => {
        dispatch(showLoading)
        try {
            dispatch(downVotePost(id));
            const res = await postApi.downVote(id)
            const post = res.data
            dispatch(setVotePost(post.id, post.voteScore))
        } catch (e) {
            dispatch(showError('Up vote', 'The was an error up voting the post. Try again. Detail:' + e.message))
            dispatch(upVotePost(id))

        }
        return dispatch(hideLoading);
    }
}