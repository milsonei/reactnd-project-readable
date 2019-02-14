import postApi from './PostApi'
import categoryApi from './CategoryApi'
import Utilities from './Utilities';

export async function getInitialData() {
    const resultCategories = await categoryApi.getAll()
    const resultPosts = await postApi.getAll()
    const field = Utilities.getFromLocalStorage('sort')   
    const authors = Utilities.getFromLocalStorage('authors')
    return {
        categories : resultCategories.data.categories,
        posts: resultPosts.data,
        sort: { field },
        authors
    }   
}