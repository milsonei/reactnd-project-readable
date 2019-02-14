import {
    RECEIVE_POSTS,
    EDIT_POST,
    ADD_POST,
    SET_VOTE_POST,
    UP_VOTE_POST,
    DOWN_VOTE_POST
} from '../actions/posts'

export default function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            let posts = {}
            action.posts.forEach(post => posts[post.id] = post)
            return {
                ...state,
                ...posts
            }
        case EDIT_POST:
            const {
                id,
                title,
                body
            } = action
            return {
                ...state,
                [id]: {
                    ...state[id],
                    title,
                    body
                }
            }
        case ADD_POST:
            return {
                ...state,
                ...action.post
            }
        case SET_VOTE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: action.voteScore
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