import {
    RECEIVE_POSTS,
    EDIT_POST,
    ADD_POST,
    SET_VOTE_POST,
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    INCREMENT_COMMENT_COUNTER,
    DECREMENT_COMMENT_COUNTER,
    DELETE_POST
} from '../actions/posts'

import Utilities from '../utils/Utilities';
/**
 * This reducer specify how the posts's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            const posts = Utilities.normalize(action.posts)
            return {
                ...state,
                ...posts,
            }         
        case EDIT_POST:
            const {
                id,
                title,
                body,
                category
            } = action
            return { 
                ...state,
                [id]: {
                    ...state[id],
                    title,
                    body,
                    category
                }
            }
        case ADD_POST:
            let newPost = {}
            newPost[action.post.id] = action.post
            return {
                ...state,                
                ...newPost
            }
        case DELETE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    deleted: true
                }
            }
        case SET_VOTE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: action.voteScore
                }
            }
        case INCREMENT_COMMENT_COUNTER:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    commentCount: state[action.id].commentCount + 1
                }
            }
        case DECREMENT_COMMENT_COUNTER:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    commentCount: state[action.id].commentCount - 1
                }
            }
        case UP_VOTE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore + 1
                }
            }
        case DOWN_VOTE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore - 1
                }
            }
        default:
            return state
    }
}