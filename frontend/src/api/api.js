import postApi from './PostApi'
import categoryApi from './CategoryApi'
import Utilities from '../utils/Utilities';
import userApi from './UserApi';
import DateDiff from 'date-diff'
/**
 * Async function to get initial data
 */
export async function getInitialData() {
    const resultCategories = await categoryApi.getAll()
    const resultPosts = await postApi.getAll()    
    const resultUsers = await userApi.getAll()  
    const sortItems = Utilities.getFromLocalStorage('sort-posts') || ({field: 'voteScore', mode: 'desc'})
    const sortComments = Utilities.getFromLocalStorage('sort-comments') || ({field: 'voteScore', mode: 'desc'})    
    let authedUser = Utilities.getFromLocalStorage('authed-user')
    const remember = Utilities.getFromLocalStorage('remember')
    const users = resultUsers.data
    if (authedUser){
        if (users.filter(user => user.id === authedUser.id).length === 0){
            authedUser = null
        }else{
            var diff = new DateDiff(Utilities.generateTimestamp(), authedUser.date);
            /** Expired time defined to 20 minutes */
            if (diff.minutes() > 20){
                authedUser = null
            }
        }        
    }
    return {
        categories : resultCategories.data.categories,
        posts: resultPosts.data,
        sort: { posts: {...sortItems}, comments: {...sortComments} },
        users,
        remember: remember || {},
        authedUser: authedUser || {}
    }   
}