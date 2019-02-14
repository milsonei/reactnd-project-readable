import { combineReducers } from 'redux'
import authedUser from './authedUser'
import posts from './posts'
import authors from './authors'
import comments from './comments'
import categories from './categories'
import sort from './sort'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    authedUser,
    categories,
    posts,
    comments,
    authors,
    sort,
    loadingBar: loadingBarReducer
})