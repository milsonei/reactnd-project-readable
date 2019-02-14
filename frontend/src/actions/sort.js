export const SORT_FEED = "SORT_FEED"
export function sortFeed(field){    
    return {
        type: SORT_FEED,
        field: field
    }
}

export default function handleSortFeed(field){
    return (dispatch) => {
        dispatch(sortFeed(field))
    }
}