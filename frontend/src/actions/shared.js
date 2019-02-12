import { getInitialData } from '../utils/api'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveAuthors } from './authors';
import { receivePosts } from './posts';
import { receiveCategories } from './categories';
import { receiveComments } from './comments';

const AUTHED_ID = 'milsonei'

export function handleInitialData(){
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
              .then(({categories, posts, authors }) => {
                        dispatch(receiveAuthors(authors))
                        dispatch(receivePosts(posts))
                        dispatch(receiveComments(posts))
                        dispatch(receiveCategories(categories))
                        dispatch(setAuthedUser(AUTHED_ID))                        
                        dispatch(hideLoading())
                    })
    }
}