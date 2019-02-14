import commentApi from '../utils/CommentApi'
import Comment from '../model/Comment'
import { showLoading, hideLoading } from 'react-redux-loading'
import { showError } from './error';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const SET_VOTE_COMMENT = 'SET_VOTE_COMMENT'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'

export function receiveComments(postId, comments){
    return {
        type: RECEIVE_COMMENTS,
        postId,
        comments
    }
}

function addComment(postId, comment){
    return {
        type: ADD_COMMENT,
        postId,
        comment
    }
}

function setVoteComment( postId, commentId, voteScore ){
    return {
        type: SET_VOTE_COMMENT,
        postId,
        commentId,
        voteScore
    }
}

function upVoteComment( postId, commentId ){
    return {
        type: UP_VOTE_COMMENT,
        postId,
        commentId
    }
}

function downVoteComment( postId, commentId ){
    return {
        type: DOWN_VOTE_COMMENT,
        postId,
        commentId        
    }
}

export function handleAllComments(postId){
    return async (dispatch) => {       
        dispatch(showLoading)      
        try {
            const res = await commentApi.getAll(postId);
            const comments = res.data;
            dispatch(receiveComments(postId, comments));
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
            const res = await commentApi.add(newComment);
            const comment = res.data;
            dispatch(addComment(postId, comment));
        }
        catch (e) {
            dispatch(showError('New comment', 'The was an error adding new comment. Try again.'));
        }
        return dispatch(hideLoading);    
    }
}

export function handleUpVoteComment(postId, commentId){
    return async (dispatch) => {     
        dispatch(showLoading)
        try {
            dispatch(upVoteComment(postId, commentId));
            const res = await commentApi.upVote(commentId);
            const comment = res.data;
            dispatch(setVoteComment(postId, commentId, comment.voteScore));
        }
        catch (e) {
            dispatch(downVoteComment(postId, commentId));
            dispatch(showError('Up vote', 'The was an error up voting the comment. Try again.'));
        }
        return dispatch(hideLoading);
    }
}

export function handleDownVoteComment(postId, commentId){
    return async (dispatch) => {     
        dispatch(showLoading)
        try {
            dispatch(downVoteComment(postId, commentId));
            const res = await commentApi.downVote(commentId);
            const comment = res.data;
            dispatch(setVoteComment(postId, commentId, comment.voteScore));
        }
        catch (e) {
            dispatch(upVoteComment(postId, commentId));
            dispatch(showError('Down vote', 'The was an error down voting the comment. Try again.'));
        }
        return dispatch(hideLoading);
    }
}