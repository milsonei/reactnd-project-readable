import { combineReducers } from 'redux'
import authedUser from './authedUser'
import posts from './posts'
import users from './users'
import comments from './comments'
import categories from './categories'
import sort from './sort'
import avatar from './avatar'
import redirect from './redirect'
import remember from './remember'
import success from './success'
import loaded from './loaded'
import search from './search'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    remember,
    authedUser,
    categories,
    posts,
    comments,
    users,
    avatar,
    sort,
    search,
    redirect,
    success, 
    loaded, 
    loadingBar: loadingBarReducer
})