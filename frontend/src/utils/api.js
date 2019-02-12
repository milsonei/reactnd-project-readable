import postApi from './PostApi'
import categoryApi from './CategoryApi'
import utilities from './utilities';

export function getInitialData() {
    return Promise.all([
        categoryApi.getAll(),
        postApi.getAll()
    ]).then(([categories, posts]) => ({
        categories,
        posts,
        /** get distict authors */
        authors: utilities.createAuthors([...new Set((posts.map(p => p.author)).sort())])
    }))

}