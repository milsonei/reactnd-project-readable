import { getInitialData } from '../utils/api'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receivePosts } from './posts';
import { sortFeed } from './sort';
import { receiveAuthors } from './authors';
import { receiveCategories } from './categories';

const AUTHED_ID = 'milsonei'

export function handleInitialData(){
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
              .then(({categories, posts, sort, authors }) => {
                        dispatch(sortFeed(sort.field))  
                        dispatch(receiveAuthors(authors))   
                        dispatch(receivePosts(posts))                        
                        dispatch(receiveCategories(categories))                          
                        dispatch(setAuthedUser(AUTHED_ID))                                          
                        dispatch(hideLoading())
                      
                    })
    }
}