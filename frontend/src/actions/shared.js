import { getInitialData } from '../api/api'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receivePosts } from './posts';
import { sortItems } from './sort';
import { receiveUsers } from './users';
import { receiveCategories } from './categories';
import { setRemember } from './remember';
import { setLoadead } from './loaded';
/**
 * Action creator to load the initial data
 */
export function handleInitialData(){
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
              .then(({categories, posts, sort, users, authedUser, remember }) => {                        
                        dispatch(sortItems(sort.posts.field, sort.posts.mode, 'posts'))         
                        dispatch(sortItems(sort.comments.field, sort.comments.mode, 'comments'))               
                        dispatch(receiveUsers(users))
                        dispatch(setAuthedUser(authedUser.id))   
                        dispatch(receivePosts(posts))
                        dispatch(receiveCategories(categories))   
                        dispatch(setRemember(remember.id))                                                                     
                        dispatch(setLoadead())                     
                        dispatch(hideLoading())
                      
                    })
    }
}