import commentApi from '../api/CommentApi'
import Comment from '../model/Comment'
import { showLoading, hideLoading } from 'react-redux-loading'
import { showError } from './error';
import { incrementCommentCounter, decrementCommentCounter } from './posts';
import { setSuccess } from './success';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const SET_VOTE_COMMENT = 'SET_VOTE_COMMENT'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_ALL_COMMENTS = 'DELETE_ALL_COMMENTS'
/**
 * Action responsible for receiving a collection of comments
 * @param {string} comments Collection of comments
 */
export function receiveComments(comments){
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}
/**
 * Action responsible for adding a comment
 * @param {any} comment The comment
 */
function addComment(comment){
    return {
        type: ADD_COMMENT,        
        comment
    }
}

/**
 * Action responsible for deleting a comment
 * @param {string} id The comment id
 */
function deleteComment(id){
    return {
        type: DELETE_COMMENT,        
        id
    }
}

/**
 * Action responsible for delete all comments in a post
 * @param {string} id The comment id
 */
export function deleteAllComments(parentId){
    return {
        type: DELETE_ALL_COMMENTS,        
        parentId
    }
}

/**
 * Action responsible for changing comment details
 * @param {string} id The comment id 
 * @param {string} body The body of the comment
 */
function editComment(id, body) {
    return {
        type: EDIT_COMMENT,
        id,        
        body
    }
}
/**
 * Action responsible for confirming the vote score after saving it in the database. In a multi-user 
 * environment, the vote may change before sending.
 * @param {string} id comment id
 * @param {number} voteScore vote score
 */
function setVoteComment( id, voteScore ){
    return {
        type: SET_VOTE_COMMENT,        
        id,
        voteScore
    }
}
/**
 * Uptimist update - action responsible for increase the vote score before sending to database 
 * @param {string} id The comment id
 */
function upVoteComment( id ){
    return {
        type: UP_VOTE_COMMENT,        
        id
    }
}
/**
 * Uptimist update - action responsible for descreasing the vote score before sending to database 
 * @param {string} id The comment id
 */
function downVoteComment( id ){
    return {
        type: DOWN_VOTE_COMMENT,        
        id        
    }
}

export function handleAllComments(postId){
    return async (dispatch) => {       
        dispatch(showLoading)      
        try {
            const res = await commentApi.getAll(postId);
            const comments = res.data;
            dispatch(receiveComments(comments));
        }
        catch (e) {
            dispatch(showError('New comment', 'The was an error fetching comments. Try again.'));
        }
        return dispatch(hideLoading);    
    }
}

export function handleAddComment(postId, body, author){
    return async (dispatch) => {       
        dispatch(showLoading)

        const newComment = new Comment(body, author, postId)

        try {
            dispatch(incrementCommentCounter(postId))
            const res = await commentApi.add(newComment);
            const comment = res.data;
            dispatch(addComment(comment));
            dispatch(setSuccess());
        }
        catch (e) {
            dispatch(decrementCommentCounter(postId))
            dispatch(showError('New comment', 'The was an error adding new comment. Try again.'));            
        }
        return dispatch(hideLoading);    
    }
}

export function handleDeleteComment(postId, id){
    return async (dispatch) => {       
        dispatch(showLoading)      

        try {
            const res = await commentApi.delete(id);
            const comment = res.data;
            if (comment.deleted){
                dispatch(deleteComment(id));
                dispatch(decrementCommentCounter(postId))
                dispatch(setSuccess())
            }
        }
        catch (e) {
            dispatch(showError('New comment', 'The was an error adding new comment. Try again.'));
        }
        return dispatch(hideLoading);    
    }
}
/**
 * The handler responsible for sending changed comment details
 * @param {string} id The id of the comment 
 * @param {string} body the body of the comment
 */
export function handleEditComment(id, body) {
    return async (dispatch) => {
        dispatch(showLoading)
        try {
            await commentApi.edit(id, body)
            dispatch(editComment(id, body))
        } catch (e) {
            dispatch(showError('Edit comment', 'The was an error editing comment. Try again.'));
        }
        return dispatch(hideLoading)
    }
}
/**
 * The async handler responsible for increase the vote score
 * @param {string} id The comment id
 */
export function handleUpVoteComment(id){
    return async (dispatch) => {     
        dispatch(showLoading)
        try {
            dispatch(upVoteComment(id));
            const res = await commentApi.upVote(id);
            const comment = res.data;
            dispatch(setVoteComment(id, comment.voteScore));
        }
        catch (e) {
            dispatch(downVoteComment(id));
            dispatch(showError('Up vote', 'The was an error up voting the comment. Try again.'));
        }
        return dispatch(hideLoading);
    }
}
/**
 * The async handler responsible for decreasing the vote score
 * @param {string} id The comment id
 */
export function handleDownVoteComment(id){
    return async (dispatch) => {     
        dispatch(showLoading)
        try {
            dispatch(downVoteComment(id));
            const res = await commentApi.downVote(id);
            const comment = res.data;
            dispatch(setVoteComment(id, comment.voteScore));
        }
        catch (e) {
            dispatch(upVoteComment(id));
            dispatch(showError('Down vote', 'The was an error down voting the comment. Try again.'));
        }
        return dispatch(hideLoading);
    }
}