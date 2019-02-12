import {
    RECEIVE_COMMENTS,
    ADD_COMMENT,
    SET_VOTE_COMMENT,
    UP_VOTE_COMMENT,
    DOWN_VOTE_COMMENT
} from '../actions/comments'

export default function comments(state = {}, action) {
    const {
        postId,
        commentId,
        voteScore
    } = action;
    switch (action.type) {
        case RECEIVE_COMMENTS:
            let comments = {}
            action.comments.forEach(comment => comments[comment.id] = comment)
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    ...comments
                }
            }
        case ADD_COMMENT:
            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    [commentId]: action.comment
                }

            }
        case SET_VOTE_COMMENT:
           
            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    [commentId]: {
                        ...state[postId][commentId],
                        voteScore
                    }
                }
            }
        case UP_VOTE_COMMENT:            
            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    [commentId]: {
                        ...state[postId][commentId],
                        voteScore: state[postId][commentId].voteScore++
                    }
                }
            }
        case DOWN_VOTE_COMMENT:           
            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    [commentId]: {
                        ...state[postId][commentId],
                        voteScore: state[postId][commentId].voteScore--
                    }
                }
            }
        default:
            return state
    }
}